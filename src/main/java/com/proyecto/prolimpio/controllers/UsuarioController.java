package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.UsuarioDaoImp;
import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Usuario;
import com.proyecto.prolimpio.util.EmailUtil;
import com.proyecto.prolimpio.util.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDaoImp usuarioDaoImp;
    @Autowired
    private EmailUtil emailUtil;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)//revisar si el metodo es util
    public List<String> login(@RequestBody Usuario usuario){
        List<String> res = new ArrayList<>();
        Usuario usuarioLogeado= usuarioDaoImp.verificarUsuario(usuario);
        if(usuarioLogeado!=null){
            String tokenJwt = jwtUtil.create(usuarioLogeado.getIdUsuario().toString(),usuarioLogeado.getEmail());
            res.add(tokenJwt);
            String rol = usuarioLogeado.getRol();
            res.add(rol);
            res.add(usuarioLogeado.getEmpleado().getIdEmpleado().toString());
            return res;
        }
        return res;
    }
    @PostMapping("api/usuarios")
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuario.getPass());
        usuario.setPass(hash);

        usuarioDaoImp.crear(usuario);
    }
    @PostMapping(value = "api/usuarios/verificar")
    public String getRespuestaUsuario(@RequestBody Usuario usuario){
        if(usuarioDaoImp.getEmp(usuario)){
            return "nuevo";
        }else{
            return "viejo";
        }

    }
    @PostMapping(value = "api/usuarios/password")
    public String insertPassword(@RequestBody Usuario usuario){
        String pass = usuario.getPass().toString().trim();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,pass);

        usuario.setPass(hash);
        if(usuarioDaoImp.insertPass(usuario)){
            return "exito";
        }else{
            return "fail";
        }
    }
    @PostMapping("api/usuarios/verificarEmail")
    public String existeCorreo(@RequestBody Map<String, String> requestData) throws MessagingException {
        String email=requestData.get("email");
        if(usuarioDaoImp.verificarSiExiste(email)){
            emailUtil.sendPasswordEmail(email);
            return "existe";
        }else{
            return "fail";
        }
    }

    @PostMapping(value = "api/usuarios/passwordXcorreo")//inserto la pass nuevo que lo realize con envio de email
    public String insertPasswordXCorreo(@RequestBody Usuario usuario){
        String pass = usuario.getPass().toString().trim();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,pass);

        usuario.setPass(hash);
        if(usuarioDaoImp.insertPass(usuario)){
            return "exito";
        }else{
            return "fail";
        }
    }



}

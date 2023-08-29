package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.UsuarioDaoImp;
import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDaoImp usuarioDaoImp;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)//revisar si el metodo es util
    public String login(@RequestBody Usuario usuario){
        return usuarioDaoImp.verificarUsuario(usuario);
    }
    @PostMapping("api/usuarios")//revisar si el metodo es util
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



}

package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.UsuarioDao;
import com.proyecto.prolimpio.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){
        return usuarioDao.verificarUsuario(usuario);
    }
    @PostMapping("api/usuarios")
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1,usuario.getPass());
        usuario.setPass(hash);

        usuarioDao.registrar(usuario);
    }


}

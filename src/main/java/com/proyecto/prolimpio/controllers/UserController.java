package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.EmpleadoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private EmpleadoDao usuarioDao;
    @GetMapping
    public String prueba(){
        return "hola";
    }
    /*@RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Persona usuario){
        boolean res = usuarioDao.verificarUsuario(usuario);
        if(res==true){
            return "OK";
        }else{
            return "fallo!";
        }
    }*/


}

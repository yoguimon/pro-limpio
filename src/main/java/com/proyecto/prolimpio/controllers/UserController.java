package com.proyecto.prolimpio.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/")
public class UserController {
    @GetMapping
    public String preuba(){
        return "register.html";
    }
}

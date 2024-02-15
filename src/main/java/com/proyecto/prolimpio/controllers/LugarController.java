package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.LugarDaoImp;
import com.proyecto.prolimpio.dto.LugarResponse;
import com.proyecto.prolimpio.models.Lugar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LugarController {
    @Autowired
    private LugarDaoImp lugarDaoImp;
    @GetMapping("/lugar")
    public List<Lugar> getTodos(){
        return lugarDaoImp.getTodos();
    }
    @DeleteMapping("/lugar/{id}")
    public void eliminarLugar(@PathVariable Long id){
        lugarDaoImp.eliminar(id);
    }
    @PostMapping("/lugar")
    public void crearLugar(@RequestBody LugarResponse lugarResponse){
        lugarDaoImp.crearLugar(lugarResponse);
    }
    @GetMapping("/lugar/{id}")
    public Lugar getLugar(@PathVariable Long id){
        return lugarDaoImp.getPersona(id);
    }
    @PutMapping("/lugar")
    public void setLugar(@RequestBody Lugar lugar){
        lugarDaoImp.modificar(lugar);
    }

    @GetMapping("/lugares/{id}")
    public List<Lugar> getTodosXId(@PathVariable Long id){
        return lugarDaoImp.getTodosXId(id);
    }
}

package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.models.Lugar;
import com.proyecto.prolimpio.models.Servicio;
import com.proyecto.prolimpio.services.LugarService;
import com.proyecto.prolimpio.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LugarController {
    @Autowired
    private LugarService lugarService;
    @GetMapping("/lugar")
    public List<Lugar> getTodos(){
        return lugarService.getTodos();
    }
    @DeleteMapping("/lugar/{id}")
    public void eliminarLugar(@PathVariable Long id){
        lugarService.eliminar(id);
    }
    @PostMapping("/lugar")
    public void crearLugar(@RequestBody Lugar lugar){
        lugarService.crear(lugar);
    }
    @GetMapping("/lugar/{id}")
    public Lugar getLugar(@PathVariable Long id){
        return lugarService.getPersona(id);
    }
    @PutMapping("/lugar")
    public void setLugar(@RequestBody Lugar lugar){
        lugarService.modificar(lugar);
    }
}

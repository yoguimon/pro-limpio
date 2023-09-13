package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.models.Servicio;
import com.proyecto.prolimpio.services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServicioController {
    @Autowired
    private ServicioService servicioService;
    @GetMapping("/servicio")
    public List<Servicio> getTodos(){
        return servicioService.getTodos();
    }
    @DeleteMapping("/servicio/{id}")
    public void eliminarServicio(@PathVariable Long id){
        servicioService.eliminar(id);
    }
    @PostMapping("/servicio")
    public void crearServicio(@RequestBody Servicio servicio){
        servicioService.crear(servicio);
    }
    @GetMapping("/servicio/{id}")
    public Servicio getServicio(@PathVariable Long id){
        return servicioService.getPersona(id);
    }
    @PutMapping("/servicio")
    public void setServicio(@RequestBody Servicio servicio){
        servicioService.modificar(servicio);
    }
}

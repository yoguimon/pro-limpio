package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.ServicioDaoImp;
import com.proyecto.prolimpio.models.Servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServicioController {
    @Autowired
    private ServicioDaoImp servicioDaoImp;
    @GetMapping("/servicio")
    public List<Servicio> getTodos(){
        return servicioDaoImp.getTodos();
    }
    @DeleteMapping("/servicio/{id}")
    public void eliminarServicio(@PathVariable Long id){
        servicioDaoImp.eliminar(id);
    }
    @PostMapping("/servicio")
    public void crearServicio(@RequestBody Servicio servicio){
        servicioDaoImp.crear(servicio);
    }
    @GetMapping("/servicio/{id}")
    public Object[] getServicio(@PathVariable int id){
        return servicioDaoImp.getServicio(id);
    }
    @PutMapping("/servicio")
    public void setServicio(@RequestBody Servicio servicio){
        servicioDaoImp.modificarServicio(servicio);
    }

    @GetMapping("/servicio/nombre/{nombre}")
    public List<Servicio> getServiciosXCarnet(@PathVariable String nombre){
        return servicioDaoImp.getServiciosXNombre(nombre);
    }
}

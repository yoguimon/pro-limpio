package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.dto.LugarResponse;
import com.proyecto.prolimpio.models.Asistencia;
import com.proyecto.prolimpio.models.Lugar;
import com.proyecto.prolimpio.services.AsistenciaService;
import com.proyecto.prolimpio.services.LugarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class AsistenciaController {
    @Autowired
    private AsistenciaService asistenciaService;
    @GetMapping("/asisytencia")
    public List<Asistencia> getTodos(){
        return asistenciaService.getTodos();
    }
    @DeleteMapping("/asistencia/{id}")
    public void eliminarAsistencia(@PathVariable Long id){
        asistenciaService.eliminar(id);
    }
    @PostMapping("/asistencia")
    public void agregarAsistencia(@RequestBody AsistenciaResponse asistenciaResponse){
        asistenciaService.agregarAistenciar(asistenciaResponse);
    }
    @GetMapping("/asistencia/{id}")
    public Asistencia getAsistencia(@PathVariable Long id){
        return asistenciaService.getPersona(id);
    }
    @PutMapping("/asistencia")
    public void setAsistencia(@RequestBody Asistencia asistencia){
        asistenciaService.modificar(asistencia);
    }

    //@GetMapping("/asistencia/{id}")
    //public List<Asistencia> getTodosXId(@PathVariable Long id){
        //return asistenciaService.getAllXId(id);
    //}

}

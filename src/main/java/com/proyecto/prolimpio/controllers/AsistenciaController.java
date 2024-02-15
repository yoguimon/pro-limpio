package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsistenciaDaoImp;
import com.proyecto.prolimpio.dto.AsistenciaReporte;
import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.models.Asistencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class AsistenciaController {
    @Autowired
    private AsistenciaDaoImp asistenciaDaoImp;
    @GetMapping("/asistencias/{id}")
    public List<AsistenciaReporte> getTodos(@PathVariable Long id){
        return asistenciaDaoImp.getTodasAsistencia(id);
    }
    @DeleteMapping("/asistencia/{id}")
    public void eliminarAsistencia(@PathVariable Long id){
        asistenciaDaoImp.eliminar(id);
    }
    @PostMapping("/asistencia")
    public void agregarAsistencia(@RequestBody AsistenciaResponse asistenciaResponse){
        asistenciaDaoImp.agregar(asistenciaResponse);
    }
    @GetMapping("/asistencia/{id}")
    public Asistencia getAsistencia(@PathVariable Long id){
        return asistenciaDaoImp.getPersona(id);
    }
    @PutMapping("/asistencia")
    public void setAsistencia(@RequestBody Asistencia asistencia){
        asistenciaDaoImp.modificar(asistencia);
    }
    @GetMapping("/asistencia/empleado/{id}")
    public List<Asistencia> getAsistenciasEmpleado(@PathVariable Long id){
        return asistenciaDaoImp.getTodasAsistencias(id);
    }
    @PostMapping("/asistencia/rangoFechas")
    public List<Object[]> imprimirPorRangoFecha(@RequestBody DtoFechas dtoFechas){
        return asistenciaDaoImp.getAsistenciasXFechas(dtoFechas);
    }

}

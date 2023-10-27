package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsignacionDaoImp;
import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.dto.VerificarAsignacionDTO;
import com.proyecto.prolimpio.models.EmpleadoAux;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AsignacionController {

    @Autowired
    AsignacionDaoImp asignacionDaoImp;
    @PostMapping("/asignacion")
    public ResponseEntity<Resource> agregarAsignacion(@RequestBody AsignacionResponse asignacionResponse){
        return asignacionDaoImp.crearAsignacion(asignacionResponse);
    }
    @PostMapping("/asignacion/verificar")//verificar si existe empleados que ya existen en la asignacion
    public List<EmpleadoAux> getEmpleadosExistentesEnAsignacion(@RequestBody VerificarAsignacionDTO verificarAsignacionDTO){
        return asignacionDaoImp.verificarFechasYEmpleados(verificarAsignacionDTO);
    }
    @GetMapping("/asignacion/generarPDF")
    public ResponseEntity<Resource> exportInvoice(){
        return asignacionDaoImp.generarPdf(26);
    }
    @GetMapping("/asignacion/prueba")
    public List<Object[]> prueba(){
        return asignacionDaoImp.serviciosAsignados(12);
    }
}

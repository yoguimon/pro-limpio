package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsignacionDaoImp;
import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.dto.VerificarAsignacionDTO;
import com.proyecto.prolimpio.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @GetMapping("/asignacion/reportes")
    public List<AsignacionReporte> getAsignaciones(){
        return asignacionDaoImp.getTodasAsignacionesPendientes();
    }
    @GetMapping("/asignacion/empleados/{id}")
    public List<Object[]> getEmpleadosAsignados(@PathVariable int id){
        return asignacionDaoImp.empleadosAsignados(id);
    }
    @GetMapping("/asignacion/servicios/{id}")
    public List<Object[]> getServiciosAsignados(@PathVariable int id){
        return asignacionDaoImp.serviciosAsignados(id);
    }
    @PutMapping("/asignacion/finalizar/{id}")
    public void finalizarAsignacion(@PathVariable int id){
        asignacionDaoImp.finalizarAsignacion(id);
    }
    @GetMapping("/asignacion/imprimir/{id}")
    public ResponseEntity<Resource> getPdfAsignacion(@PathVariable int id) {
        return asignacionDaoImp.generarPdf(id);
    }
    @PostMapping("/asignacion/rangoFechas")
    public List<AsignacionReporte> buscarPorRango(@RequestBody DtoFechas dtoFechas){
        return asignacionDaoImp.buscarPorRangoFechas(dtoFechas);
    }
    @GetMapping("/asignacion/finalizadas")
    public Object[] getTodasAsignacionesFinalizadasXMes(){
        return asignacionDaoImp.getTodasAsignacionesFinalizadasPorMes();
    }
    //prueba
    @GetMapping("/asignacion/datos")
    public Object[] getDatosInicio(){
        return asignacionDaoImp.getDatosIndex();
    }
}

package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsignacionDaoImp;
import com.proyecto.prolimpio.dao.ReporteDaoImp;
import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.models.AsignacionReporte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReporteController {
    @Autowired
    ReporteDaoImp reporteDaoImp;
    @GetMapping("/reporte")
    public ResponseEntity<Resource> getReporteGeneral(){
        return reporteDaoImp.imprimirTodo();
    }
    @PostMapping("/reporte/rangoFechas")
    public ResponseEntity<Resource> imprimirPorRangoFecha(@RequestBody DtoFechas dtoFechas){
        return reporteDaoImp.imprimirPorFechas(dtoFechas);
    }
    @GetMapping("/reporte/prueba")
    public ResponseEntity<Resource> getReporteGeneralPrueba(){
        return reporteDaoImp.imprimirTodo();
    }
    //PENDIENTE

    //List<AsignacionReporte>
}

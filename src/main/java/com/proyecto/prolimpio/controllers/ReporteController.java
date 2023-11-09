package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsignacionDaoImp;
import com.proyecto.prolimpio.dao.ReporteDaoImp;
import com.proyecto.prolimpio.dto.AsignacionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ReporteController {
    @Autowired
    ReporteDaoImp reporteDaoImp;
    @GetMapping("/reporte")
    public ResponseEntity<Resource> getReporteGeneral(){
        return reporteDaoImp.getReporteGeneralEnPdf();
    }
    @GetMapping("/reporte/prueba")
    public ResponseEntity<Resource> getReporteGeneralPrueba(){
        return reporteDaoImp.getReporteGeneralEnPdf();
    }
}

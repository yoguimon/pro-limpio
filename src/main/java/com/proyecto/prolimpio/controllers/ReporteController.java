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

import java.time.LocalDate;
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
    @PostMapping("/reporte/asistencia/rangoFechas")
    public ResponseEntity<Resource> imprimirAsistenciasPorRangoFechas(@RequestBody DtoFechas dtoFechas){
        return reporteDaoImp.imprimirAsistenciasPorFechas(dtoFechas);
    }

    @GetMapping("/reporte/prueba")
    public ResponseEntity<Resource> getReportePrueba(){
        DtoFechas fechas = new DtoFechas();
        fechas.setFecha_inicio(LocalDate.parse("2023-10-18"));
        fechas.setFecha_fin(LocalDate.parse("2023-11-18"));
        fechas.setOpcion("Ambos");
        return reporteDaoImp.imprimirAsistenciasPorFechas(fechas);
    }
}

package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.AsignacionDaoImp;
import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.dto.AsistenciaReporte;
import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.services.AsistenciaService;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AsignacionController {

    @Autowired
    AsignacionDaoImp asignacionDaoImp;
    @PostMapping("/asignacion")
    public void agregarAsistencia(@RequestBody AsignacionResponse asignacionResponse){
        asignacionDaoImp.crearAsignacion(asignacionResponse);
        /*System.out.println(asignacionResponse.getFecha_inicio());
        System.out.println(asignacionResponse.getFecha_fin());
        System.out.println(asignacionResponse.getHora_inicio());
        System.out.println(asignacionResponse.getHora_fin());*/
    }
}

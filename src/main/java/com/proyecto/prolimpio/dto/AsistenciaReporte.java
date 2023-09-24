package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class AsistenciaReporte {
    private String nombre;
    private String carnet;
    private LocalDate fecha;
    private LocalTime hora;
    private byte tipo;

    public AsistenciaReporte(String nombre, String carnet, LocalDate fecha, LocalTime hora, byte tipo) {
        this.nombre = nombre;
        this.carnet = carnet;
        this.fecha = fecha;
        this.hora = hora;
        this.tipo=tipo;
    }

    public AsistenciaReporte() {
    }
}

package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DtoFechas {
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private String opcion;

    public DtoFechas() {
    }

    public DtoFechas(LocalDate fecha_inicio, LocalDate fecha_fin) {
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    public DtoFechas(LocalDate fecha_inicio, LocalDate fecha_fin, String opcion) {
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.opcion = opcion;
    }
}

package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class VerificarAsignacionDTO {
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private String turno;
    private List<Integer> empleadosIds;
}

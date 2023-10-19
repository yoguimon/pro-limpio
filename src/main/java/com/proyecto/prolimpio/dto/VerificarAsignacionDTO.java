package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class VerificarAsignacionDTO {
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private List<Integer> empleadosIds;
}

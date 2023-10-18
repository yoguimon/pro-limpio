package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
@Data
public class AsignacionResponse {
    private HashMap<Integer,Double> servicios;
    private List<Integer> empleadosIds;
    private List<Integer> supervisoresIds;
    private List<Integer> lugarIds;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private double total;
}

package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.List;
@Data
public class AsignacionResponse {
    private HashMap<Integer,Double> servicios;
    private List<Integer> empleadosIds;
    private List<Integer> supervisoresIds;
    private List<Integer> lugarIds;
    private double total;
}

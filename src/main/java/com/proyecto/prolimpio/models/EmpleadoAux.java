package com.proyecto.prolimpio.models;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EmpleadoAux {
    private int idAsignacion;
    private int idEmpleado;
    private String cargo;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private String nombre;
}

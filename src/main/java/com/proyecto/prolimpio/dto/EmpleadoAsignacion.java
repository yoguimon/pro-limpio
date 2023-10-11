package com.proyecto.prolimpio.dto;

import lombok.Data;

@Data
public class EmpleadoAsignacion {
    private int idEmpleado;
    private String carnet;
    private String nombre;

    public EmpleadoAsignacion(int idEmpleado, String carnet, String nombre) {
        this.idEmpleado = idEmpleado;
        this.carnet = carnet;
        this.nombre = nombre;
    }
}

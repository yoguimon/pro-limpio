package com.proyecto.prolimpio.dto;

import com.proyecto.prolimpio.models.Cliente;
import com.proyecto.prolimpio.models.Empleado;
import lombok.Data;

@Data
public class AsistenciaResponse {
    private Empleado empleado;
    private String latitud;
    private String longitud;

    public AsistenciaResponse(Empleado empleado, String latitud, String longitud) {
        this.empleado = empleado;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

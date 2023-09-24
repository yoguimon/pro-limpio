package com.proyecto.prolimpio.dto;

import com.proyecto.prolimpio.models.Cliente;
import com.proyecto.prolimpio.models.Empleado;
import lombok.Data;

@Data
public class AsistenciaResponse {
    private byte tipo;
    private Empleado empleado;
    private String latitud;
    private String longitud;

    public AsistenciaResponse() {
    }

    public AsistenciaResponse(byte tipo, Empleado empleado, String latitud, String longitud) {
        this.tipo = tipo;
        this.empleado = empleado;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

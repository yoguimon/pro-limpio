package com.proyecto.prolimpio.dto;

import com.proyecto.prolimpio.models.Cliente;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class LugarResponse {
    private Cliente cliente;
    private String nombre;
    private String direccion;
    private String notas;
    private String latitud;
    private String longitud;

    public LugarResponse(Cliente cliente, String nombre, String direccion, String notas, String latitud, String longitud) {
        this.cliente = cliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.notas = notas;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

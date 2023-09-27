package com.proyecto.prolimpio.models;

import lombok.Data;

@Data
public class ClienteLugar {
    private int idCliente;
    private int idLugar;
    private String carnet;
    private String nombre;
    private String lugar;
    private String direccion;

    public ClienteLugar() {
    }

    public ClienteLugar(int idCliente, int idLugar, String carnet, String nombre, String lugar, String direccion) {
        this.idCliente = idCliente;
        this.idLugar = idLugar;
        this.carnet = carnet;
        this.nombre = nombre;
        this.lugar = lugar;
        this.direccion = direccion;
    }
}

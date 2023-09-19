package com.proyecto.prolimpio.models;

public class ClienteYLugarRequest {
    private Cliente cliente;
    private Lugar lugar;

    // Constructores, getters y setters

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Lugar getLugar() {
        return lugar;
    }

    public void setLugar(Lugar lugar) {
        this.lugar = lugar;
    }
}

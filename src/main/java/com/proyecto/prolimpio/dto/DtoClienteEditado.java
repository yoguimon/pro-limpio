package com.proyecto.prolimpio.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class DtoClienteEditado {
    private int idCliente;
    private String carnet;
    private String nombre;
    private String apellido;
    private String apellido_materno;
    private String telefono;
    private String correo;
    private String foto;
    private LocalDate fecha_registro;

}

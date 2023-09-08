package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idCliente")
    private Long idCliente;
    @Column(name="nombre_empresa")
    private String nombre_empresa;
    @Column(name="nombre")
    private String nombre;
    @Column(name="apellido")
    private String apellido;
    @Column(name="apellido_materno")
    private String apellido_materno;
    @Column(name="telefono")
    private String telefono;
    @Column(name="correo")
    private String correo;
    @Column(name="foto")
    private String foto;
    @Column(name="fecha_registro")
    private LocalDate fecha_registro;
    @Column(name="direccion")
    private String direccion;
    @Column(name="notas")//mensaje
    private String notas;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;


    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;

    public Cliente(){}
}

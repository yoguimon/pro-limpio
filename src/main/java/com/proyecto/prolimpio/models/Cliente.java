package com.proyecto.prolimpio.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idCliente")
    private Long idCliente;
    @Column(name="carnet")
    private String carnet;
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
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "cliente") //importante, mapea con lugar PONE TODOS LOS DATOS DEL lugar DE ESTE CLIENTE
    private List<Lugar> lugares;

    public Cliente(){}

    public Cliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Cliente(Long idCliente, String nombre, String apellido, String apellido_materno, String telefono, String correo, String foto, LocalDate fecha_registro) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.apellido_materno = apellido_materno;
        this.telefono = telefono;
        this.correo = correo;
        this.foto = foto;
        this.fecha_registro = fecha_registro;
    }

    public Cliente(String nombre, String apellido, String apellido_materno, String telefono, String correo, String foto, LocalDate fecha_registro) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.apellido_materno = apellido_materno;
        this.telefono = telefono;
        this.correo = correo;
        this.foto = foto;
        this.fecha_registro = fecha_registro;
    }

    public Cliente(Long idCliente, String nombre, String apellido, String apellido_materno, String telefono, String correo, String foto, LocalDate fecha_registro, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.apellido_materno = apellido_materno;
        this.telefono = telefono;
        this.correo = correo;
        this.foto = foto;
        this.fecha_registro = fecha_registro;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }
}

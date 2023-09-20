package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="lugar")
public class Lugar {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idLugar")
    private Long idLugar;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Un usuario se asocia con un empleado
    @JoinColumn(name = "idCliente", referencedColumnName = "idCliente")
    private Cliente cliente;
    @Column(name="nombre")
    private String nombre;
    @Column(name="direccion")
    private String direccion;
    @Column(name="notas")
    private String notas;
    @Column(name="latitud")
    private String latitud;
    @Column(name="longitud")
    private String longitud;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    public Lugar() {
    }

    public Lugar(Long idLugar, String nombre, String direccion, String notas, String latitud, String longitud, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idLugar = idLugar;
        this.nombre = nombre;
        this.direccion = direccion;
        this.notas = notas;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public Lugar(Long idLugar, Cliente cliente, String nombre, String direccion, String notas, String latitud, String longitud, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idLugar = idLugar;
        this.cliente = cliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.notas = notas;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public Lugar(Long idLugar, Cliente cliente, String nombre, String direccion, String notas, String latitud, String longitud) {
        this.idLugar = idLugar;
        this.cliente = cliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.notas = notas;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

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
    @Column(name="direccion")
    private String direccion;
    @Column(name="nombre")
    private String nombre;
    @Column(name="tipo")
    private String tipo;//oficina,edificio,casa,etc
    @Column(name="qr")
    private String qr;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    public Lugar() {
    }

    public Lugar(Long idLugar, String direccion, String nombre, String tipo, String qr, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idLugar = idLugar;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.qr = qr;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public Lugar(Long idLugar, String direccion, String nombre, String tipo, String qr) {
        this.idLugar = idLugar;
        this.direccion = direccion;
        this.nombre = nombre;
        this.tipo = tipo;
        this.qr = qr;
    }
}

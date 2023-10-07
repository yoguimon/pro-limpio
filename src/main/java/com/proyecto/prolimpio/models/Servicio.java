package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idServicio")
    private Long idServicio;
    @Column(name="nombre")
    private String nombre;
    @Column(name="costo_m2")
    private double costo_m2;
    @Column(name="descripcion")
    private String descripcion;
    @Column(name="categoria")
    private String categoria;
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    public Servicio() {
    }

    public Servicio(Long idServicio, String nombre, double costo_m2, String descripcion, String categoria, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idServicio = idServicio;
        this.nombre = nombre;
        this.costo_m2 = costo_m2;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public Servicio(Long idServicio, String nombre, double costo_m2, String descripcion, String categoria) {
        this.idServicio = idServicio;
        this.nombre = nombre;
        this.costo_m2 = costo_m2;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
}

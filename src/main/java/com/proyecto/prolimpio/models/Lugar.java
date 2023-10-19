package com.proyecto.prolimpio.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="lugar")
@JsonIgnoreProperties({"cliente"})
public class Lugar {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idLugar")
    private Long idLugar;
    @ManyToOne(fetch = FetchType.EAGER)
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
    @Column(name="estado")
    private byte estado;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "lugar")
    private List<Asignacion> asignaciones;
    public Lugar() {
    }

    public Lugar(Cliente cliente, String nombre, String direccion, String notas, String latitud, String longitud) {
        this.cliente = cliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.notas = notas;
        this.latitud = latitud;
        this.longitud = longitud;
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

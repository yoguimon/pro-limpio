package com.proyecto.prolimpio.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="asistencia")
@JsonIgnoreProperties({"empleado"})
public class Asistencia {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idAsistencia")
    private Long idAsistencia;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idEmpleado", referencedColumnName = "idEmpleado")
    private Empleado empleado;
    @Column(name="latitud")
    private String latitud;
    @Column(name="longitud")
    private String longitud;
    @CreationTimestamp
    @Column(name="fecha_hora")
    private LocalDateTime fecha_hora;
    @Column(name="tipo")
    private byte tipo;

    public Asistencia() {
    }

    public Asistencia(Long idAsistencia, Empleado empleado, String latitud, String longitud, LocalDateTime fecha_hora, byte tipo) {
        this.idAsistencia = idAsistencia;
        this.empleado = empleado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_hora = fecha_hora;
        this.tipo =tipo;
    }

    public Asistencia(Long idAsistencia, Empleado empleado, String latitud, String longitud, byte tipo) {
        this.idAsistencia = idAsistencia;
        this.empleado = empleado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.tipo=tipo;
    }

    public Asistencia(Empleado empleado, String latitud, String longitud, byte tipo) {
        this.empleado = empleado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.tipo=tipo;
    }
}

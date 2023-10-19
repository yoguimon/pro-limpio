package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "asignacion")
@Data
public class Asignacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAsignacion")
    private Long idAsignacion;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER) // Una asignacion se asocia con un lugar
    @JoinColumn(name = "idLugar", referencedColumnName = "idLugar")
    private Lugar lugar;
    @Column(name = "total")
    private double total;
    @Column(name = "fecha_inicio")
    private LocalDate fecha_inicio;
    @Column(name = "fecha_fin")
    private LocalDate fecha_fin;
    @Column(name = "hora_inicio")
    private LocalTime hora_inicio;
    @Column(name = "hora_fin")
    private LocalTime hora_fin;
    @Column(name = "estado")
    private byte estado;
    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;
    @CreationTimestamp
    @Column(name = "fecha_asignacion")
    private LocalDateTime fecha_asignacion;
    // Otras propiedades y getters/setters

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "asignacion_empleado",
            joinColumns = @JoinColumn(name = "idAsignacion"),
            inverseJoinColumns = @JoinColumn(name = "idEmpleado")
    )
    private List<Empleado> empleados;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "asignacion_servicio",
            joinColumns = @JoinColumn(name = "idAsignacion"),
            inverseJoinColumns = @JoinColumn(name = "idServicio")
    )
    private List<Servicio> servicios;

    // Constructor y métodos adicionales
}

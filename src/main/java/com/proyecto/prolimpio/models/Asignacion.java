package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "asignacion")
@Data
public class Asignacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idAsignacion")
    private Long idAsignacion;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true) // Una asignacion se asocia con un lugar
    @JoinColumn(name = "idLugar", referencedColumnName = "idLugar")
    private Lugar lugar;
    @Column(name = "total")
    private double total;
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

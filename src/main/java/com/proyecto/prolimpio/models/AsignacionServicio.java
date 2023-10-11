package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "asignacion_servicio")
@Data
public class AsignacionServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idAsignacionServicio", nullable = false, insertable = false)
    private Long idAsignacionServicio;

    @ManyToOne
    @JoinColumn(name = "idAsignacion")
    private Asignacion asignacion;

    @ManyToOne
    @JoinColumn(name = "idServicio")
    private Servicio servicio;

    @Column(name = "total_servicio")
    private double totalServicio;

    // Puedes agregar otras propiedades según tus necesidades

    // Constructores, getters y setters
}

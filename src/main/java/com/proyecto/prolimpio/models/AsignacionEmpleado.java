package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "asignacion_empleado")
@Data
public class AsignacionEmpleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idAsignacionEmpleado", nullable = false, insertable = false)
    private Long idAsignacionEmpleado;
    @ManyToOne
    @JoinColumn(name = "idAsignacion")
    private Asignacion asignacion;
    @ManyToOne
    @JoinColumn(name = "idEmpleado")
    private Empleado empleado;
    @Column(name="cargo")
    private String cargo;

    // Puedes agregar otras propiedades según tus necesidades

    // Constructores, getters y setters
}

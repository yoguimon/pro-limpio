package com.proyecto.prolimpio.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="idUsuario")
    private Long idUsuario;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true) // Un usuario se asocia con un empleado
    @JoinColumn(name = "idEmpleado", referencedColumnName = "idEmpleado")
    private Empleado empleado; // Esto representa la relación, PONE EL EMPLEADO Y SUS DATOS DE ESTE USUARIO
    //@Column(name="idEmpleado")
    //private Long idEmpleado;

    @Column(name="email")
    private String email;
    @Column(name="pass")
    private String pass;
    @Column(name="rol")
    private String rol;
}

package com.proyecto.prolimpio.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="empleado")
public class Empleado {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="idEmpleado", nullable = false, insertable = false)
    private Long idEmpleado;
    //@NotEmpty

    @Column(name="carnet")
    private String carnet;
    @Column(name="nombre")
    private String nombre;
    @Column(name="apellido")
    private String apellido;
    @Column(name="apellido_materno")
    private String apellido_materno;
    @Column(name="fecha_contratacion")
    public LocalDate fecha_contratacion;
    @Column(name="puesto")
    private String puesto;
    @Column(name="salario")
    private int salario;
    @Column(name="fecha_nacimiento")
    private LocalDate fecha_nacimiento;
    @Column(name="estado_civil")
    private String estado_civil;
    @Column(name="sexo")
    private char sexo;
    @Column(name="direccion")
    private String direccion;
    @Column(name="telefono")
    private String telefono;
    @Column(name="correo")
    private String correo;
    @Column(name="foto")
    private String foto;
    @CreationTimestamp
    @Column(name="fecha_creacion")
    private LocalDateTime fecha_creacion;
    @UpdateTimestamp
    @Column(name="fecha_actualizacion")
    private LocalDateTime fecha_actualizacion;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "empleado") //importante, mapea con usuario PONE TODOS LOS DATOS DEL USUARIO DE ESTE EMPLEADO
    private Usuario usuario;

    public Empleado(Long idEmpleado, String carnet, String nombre, String apellido, String apellido_materno, String puesto, String telefono) {
        this.idEmpleado = idEmpleado;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido = apellido;
        this.apellido_materno=apellido_materno;
        this.puesto = puesto;
        this.telefono = telefono;
    }
    public Empleado(){}

    public Empleado(String carnet, String correo) {
        this.carnet = carnet;
        this.correo = correo;
    }

    public Empleado(Long idEmpleado, String carnet, String nombre, String apellido, String apellido_materno, LocalDate fecha_contrato, String puesto, int salario, LocalDate fecha_nacimiento, String estado_civil, char sexo, String direccion, String telefono, String correo, String foto, LocalDateTime fecha_creacion, LocalDateTime fecha_actualizacion) {
        this.idEmpleado = idEmpleado;
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellido = apellido;
        this.apellido_materno=apellido_materno;
        this.fecha_contratacion = fecha_contratacion;
        this.puesto = puesto;
        this.salario = salario;
        this.fecha_nacimiento = fecha_nacimiento;
        this.estado_civil = estado_civil;
        this.sexo = sexo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.foto = foto;
        this.fecha_creacion = fecha_creacion;
        this.fecha_actualizacion = fecha_actualizacion;
    }


}

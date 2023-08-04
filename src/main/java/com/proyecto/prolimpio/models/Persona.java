package com.proyecto.prolimpio.models;

import jakarta.persistence.*;

@Entity
@Table(name="persona")
public class Persona {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="idPersona")
    private Long idPersona;
    @Column(name="carnet")
    private String carnet;
    @Column(name="nombres")
    private String nombres;
    @Column(name="apellidoPaterno")
    private String apellidoPaterno;
    @Column(name="apellidoMaterno")
    private String apellidoMaterno;
    @Column(name="sexo")
    private char sexo;
    @Column(name="rol")
    private String rol;

    /*public Persona() {
    }

    public Persona(Long idPersona, String carnet, String nombres, String apellidoPaterno, String apellidoMaterno, char sexo, String rol) {
        this.idPersona = idPersona;
        this.carnet = carnet;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.sexo = sexo;
        this.rol = rol;
    }*/

    public Long getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(Long idPersona) {
        this.idPersona = idPersona;
    }

    public String getCarnet() {
        return carnet;
    }

    public void setCarnet(String carnet) {
        this.carnet = carnet;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public char getSexo() {
        return sexo;
    }

    public void setSexo(char sexo) {
        this.sexo = sexo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}

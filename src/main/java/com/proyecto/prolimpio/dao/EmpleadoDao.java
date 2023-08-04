package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpleadoDao {
    List<Persona> getEmpleados();
     void eliminar(Long id);
     void crear(Persona persona);
     Persona getPersona(Long id);
     void modificar(Persona persona);
}

package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrudDao<T>{
    List<T> getTodos();
    void eliminar(Long id);
     void crear(T t);
     T getPersona(Long id);
     void modificar(T t);
}

package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Empleado;

import java.util.List;

public interface CrudDao<T>{
    List<T> getTodos();
    void eliminar(Long id);
     void crear(T t);
     T getPersona(Long id);
     void modificar(T t);
}

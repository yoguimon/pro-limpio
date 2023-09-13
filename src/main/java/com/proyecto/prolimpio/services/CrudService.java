package com.proyecto.prolimpio.services;

import java.util.List;

public interface CrudService<T> {
    List<T> getTodos();
    void eliminar(Long id);
    void crear(T t);
    T getPersona(Long id);
    void modificar(T t);
}

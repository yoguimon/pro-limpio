package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Servicio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.Provider;
import java.util.List;
@Repository
@Transactional
public class ServicioDaoImp implements CrudDao<Servicio>{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Servicio> getTodos() {
        String query = "SELECT idServicio,nombre,descripcion,categoria\n" +
                "FROM servicio";
        List<Servicio> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Servicio servicio = entityManager.find(Servicio.class,id);
        entityManager.remove(servicio);
    }

    @Override
    public void crear(Servicio servicio) {
        entityManager.merge(servicio);
    }

    @Override
    public Servicio getPersona(Long id) {
        return entityManager.find(Servicio.class,id);
    }

    @Override
    public void modificar(Servicio servicio) {
        entityManager.merge(servicio);
    }
}
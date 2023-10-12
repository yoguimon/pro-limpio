package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.ClienteLugar;
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
        String query = "SELECT idServicio,nombre,descripcion,costo_m2,categoria\n" +
                "FROM servicio WHERE estado=1;";
        List<Servicio> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Servicio servicio = entityManager.find(Servicio.class,id);
        servicio.setEstado((byte)0);
        entityManager.merge(servicio);
    }

    @Override
    public void crear(Servicio servicio) {
        servicio.setEstado((byte)1);
        entityManager.persist(servicio);
    }

    @Override
    public Servicio getPersona(Long id) {
        return entityManager.find(Servicio.class,id);
    }

    @Override
    public void modificar(Servicio servicio) {
        entityManager.merge(servicio);
    }

    public List<Servicio> getServiciosXNombre(String nombre) {
        String query = "SELECT * FROM Servicio WHERE nombre LIKE :nombre AND estado=1";
        List<Servicio> resultado = entityManager.createNativeQuery(query)
                .setParameter("nombre","%" + nombre + "%")
                .getResultList();
        return resultado;
    }
}

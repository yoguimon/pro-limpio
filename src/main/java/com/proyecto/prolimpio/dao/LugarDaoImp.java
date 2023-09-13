package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Lugar;
import com.proyecto.prolimpio.models.Servicio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class LugarDaoImp implements CrudDao<Lugar>{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Lugar> getTodos() {
        String query = "SELECT idLugar,direccion,nombre,tipo\n" +
                "FROM lugar";
        List<Lugar> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Lugar lugar = entityManager.find(Lugar.class,id);
        entityManager.remove(lugar);
    }

    @Override
    public void crear(Lugar lugar) {
        entityManager.merge(lugar);
    }

    @Override
    public Lugar getPersona(Long id) {
        return entityManager.find(Lugar.class,id);
    }

    @Override
    public void modificar(Lugar lugar) {
        entityManager.merge(lugar);
    }
}

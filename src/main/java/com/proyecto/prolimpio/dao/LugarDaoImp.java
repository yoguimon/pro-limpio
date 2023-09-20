package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Lugar;
import com.proyecto.prolimpio.models.Servicio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
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
        entityManager.persist(lugar);
    }

    public void crearLugar(Lugar lugar) {
        String query = "INSERT INTO lugar (idCliente, nombre, direccion, notas, latitud, longitud) " +
                "VALUES (:idCliente, :nombre, :direccion, :notas, :latitud, :longitud)";

        Query insertQuery = entityManager.createNativeQuery(query)
                .setParameter("idCliente", lugar.getCliente().getIdCliente())
                .setParameter("nombre", lugar.getNombre())
                .setParameter("direccion", lugar.getDireccion())
                .setParameter("notas", lugar.getNotas())
                .setParameter("latitud", lugar.getLatitud())
                .setParameter("longitud", lugar.getLongitud());

        insertQuery.executeUpdate();
    }

    @Override
    public Lugar getPersona(Long id) {
        return entityManager.find(Lugar.class,id);
    }

    @Override
    public void modificar(Lugar lugar) {
        entityManager.merge(lugar);
    }

    public List<Lugar> getTodosXId(Long id) {
        String query = "SELECT * FROM lugar WHERE idCliente=:id";
        List<Lugar> resultado = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return resultado;
    }
}

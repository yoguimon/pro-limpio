package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.models.Asistencia;
import com.proyecto.prolimpio.models.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class AsistenciaDaoImp implements CrudDao<Asistencia>{
    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Asistencia> getTodos() {
        return null;
    }

    @Override
    public void eliminar(Long id) {

    }

    @Override
    public void crear(Asistencia asistencia) {

    }

    @Override
    public Asistencia getPersona(Long id) {
        return null;
    }

    @Override
    public void modificar(Asistencia asistencia) {

    }

    public void agregar(AsistenciaResponse asistenciaResponse) {
        Empleado empleado = entityManager.find(Empleado.class,asistenciaResponse.getEmpleado().getIdEmpleado());
        Asistencia asistencia = new Asistencia();
        asistencia.setEmpleado(empleado);
        asistencia.setLatitud(asistenciaResponse.getLatitud());
        asistencia.setLongitud(asistenciaResponse.getLongitud());
        entityManager.persist(asistencia);


    }
}

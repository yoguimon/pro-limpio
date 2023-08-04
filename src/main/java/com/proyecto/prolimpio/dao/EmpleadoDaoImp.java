package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Persona;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional//rolback=proceso completo
public class EmpleadoDaoImp implements EmpleadoDao{

    @PersistenceContext //carga el objeto entitymanager
    EntityManager entityManager;
    @Override
    @Transactional
    public List<Persona> getEmpleados() {
        String query = "FROM Persona";
        List<Persona> resultado = entityManager.createQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Persona persona = entityManager.find(Persona.class,id);
        entityManager.remove(persona);
    }

    @Override
    public void crear(Persona persona) {
        entityManager.merge(persona);
    }

    @Override
    public Persona getPersona(Long id) {
        Persona persona= entityManager.find(Persona.class,id);
        return persona;
    }

    @Override
    public void modificar(Persona persona) {
        Persona vieja = entityManager.find(Persona.class,persona.getIdPersona());
        mapear(persona,vieja);
        entityManager.merge(vieja);
    }

    private void mapear(Persona persona, Persona vieja) {
        vieja.setCarnet(persona.getCarnet());
        vieja.setNombres(persona.getNombres());
        vieja.setApellidoPaterno(persona.getApellidoPaterno());
        vieja.setApellidoMaterno(persona.getApellidoMaterno());
        vieja.setSexo(persona.getSexo());
        vieja.setRol(persona.getRol());
    }
}

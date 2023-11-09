package com.proyecto.prolimpio.services;

import com.proyecto.prolimpio.dao.ServicioDaoImp;
import com.proyecto.prolimpio.models.Servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service//logica
public class ServicioService implements CrudService<Servicio>{
    @Autowired
    ServicioDaoImp servicioDaoImp;
    @Override
    public List<Servicio> getTodos() {
        return servicioDaoImp.getTodos();
    }

    @Override
    public void eliminar(Long id) {
        servicioDaoImp.eliminar(id);
    }

    @Override
    public void crear(Servicio servicio) {
        servicioDaoImp.crear(servicio);
    }

    @Override
    public Servicio getPersona(Long id) {
        return servicioDaoImp.getPersona(id);
    }

    @Override
    public void modificar(Servicio service) {
        servicioDaoImp.modificar(service);
    }

    public List<Servicio> getServiciosXCarnet(String nombre) {
        return servicioDaoImp.getServiciosXNombre(nombre);
    }

    public Object[] getServicio(int id) {
        return servicioDaoImp.getServicio(id);
    }

    public void modificarServicio(Servicio servicio) {
        servicioDaoImp.modificarServicio(servicio);
    }
}

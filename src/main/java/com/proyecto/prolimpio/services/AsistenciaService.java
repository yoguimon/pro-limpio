package com.proyecto.prolimpio.services;

import com.proyecto.prolimpio.dao.AsistenciaDaoImp;
import com.proyecto.prolimpio.dao.LugarDaoImp;
import com.proyecto.prolimpio.dto.AsistenciaReporte;
import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.models.Asistencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AsistenciaService implements CrudService<Asistencia>{
    @Autowired
    private AsistenciaDaoImp asistenciaDaoImp;
    @Override
    public List<Asistencia> getTodos() {
        return null;
    }
    public List<AsistenciaReporte> getTodasAsistencia(Long id) {
        return asistenciaDaoImp.getTodasAsistencia(id);
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

    public void agregarAistenciar(AsistenciaResponse asistenciaResponse) {
        asistenciaDaoImp.agregar(asistenciaResponse);
    }
}

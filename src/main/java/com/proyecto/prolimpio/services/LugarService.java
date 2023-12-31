package com.proyecto.prolimpio.services;

import com.proyecto.prolimpio.dao.LugarDaoImp;
import com.proyecto.prolimpio.dao.ServicioDaoImp;
import com.proyecto.prolimpio.dto.LugarResponse;
import com.proyecto.prolimpio.models.Lugar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LugarService implements  CrudService<Lugar>{
    @Autowired
    private LugarDaoImp lugarDaoImp;

    @Override
    public List<Lugar> getTodos() {
        return lugarDaoImp.getTodos();
    }

    @Override
    public void eliminar(Long id) {
        lugarDaoImp.eliminar(id);
    }

    @Override
    public void crear(Lugar lugar) {

    }
    public void crearLugar(LugarResponse lugarResponse) {
        lugarDaoImp.crearLugar(lugarResponse);
    }
    @Override
    public Lugar getPersona(Long id) {
        return lugarDaoImp.getPersona(id);
    }

    @Override
    public void modificar(Lugar lugar) {
        lugarDaoImp.modificarLugar(lugar);
    }

    public List<Lugar> getAllXId(Long id) {
        return lugarDaoImp.getTodosXId(id);
    }
}

package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.LugarResponse;
import com.proyecto.prolimpio.models.Cliente;
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
    public List<Lugar> getTodos() {//ESTO NO LO USO YA, ESTA MAL...
        String query = "SELECT idLugar,direccion,nombre,tipo\n" +
                "FROM lugar WHERE estado=1";
        List<Lugar> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Lugar lugar = entityManager.find(Lugar.class,id);
        lugar.setEstado((byte)0);
        entityManager.merge(lugar);
    }

    @Override
    public void crear(Lugar lugar) {
        lugar.setEstado((byte)1);
        entityManager.persist(lugar);
    }

    public void crearLugar(LugarResponse lugarResponse) {
        Cliente cliente = entityManager.find(Cliente.class,lugarResponse.getCliente().getIdCliente());
        Lugar lugar = new Lugar();
        lugar.setCliente(cliente);
        lugar.setNombre(lugarResponse.getNombre());
        lugar.setDireccion(lugarResponse.getDireccion());
        lugar.setNotas(lugarResponse.getNotas());
        lugar.setLatitud(lugarResponse.getLatitud());
        lugar.setLongitud(lugarResponse.getLongitud());
        lugar.setEstado((byte)1);
        entityManager.persist(lugar);
    }

    @Override
    public Lugar getPersona(Long id) {
        return entityManager.find(Lugar.class,id);
    }

    @Override
    public void modificar(Lugar lugar) {
        Lugar lugarViejo = entityManager.find(Lugar.class,lugar.getIdLugar());
        lugarViejo.setNombre(lugar.getNombre());
        lugarViejo.setDireccion(lugar.getDireccion());
        lugarViejo.setNotas(lugar.getNotas());
        lugarViejo.setLongitud(lugar.getLongitud());
        lugarViejo.setLatitud(lugar.getLatitud());
        entityManager.merge(lugarViejo);
    }
    public void modificarLugar(Lugar lugar) {
        Lugar lugarViejo = entityManager.find(Lugar.class,lugar.getIdLugar());
        lugarViejo.setNombre(lugar.getNombre());
        lugarViejo.setDireccion(lugar.getDireccion());
        lugarViejo.setNotas(lugar.getNotas());
        lugarViejo.setLatitud(lugar.getLatitud());
        lugarViejo.setLongitud(lugar.getLongitud());
        entityManager.merge(lugarViejo);
    }

    public List<Lugar> getTodosXId(Long id) {
        String query = "SELECT * FROM lugar WHERE idCliente=:id AND estado=1";
        List<Lugar> resultado = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return resultado;
    }
}

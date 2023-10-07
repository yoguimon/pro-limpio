package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional//rolback=proceso completo
public class ClienteDaoImp implements CrudDao<Cliente> {
    @PersistenceContext //carga el objeto entitymanager
    EntityManager entityManager;
    @Override
    @Transactional
    public List<Cliente> getTodos() {
        String query = "SELECT idCliente,carnet,CONCAT(nombre,' ',apellido,' ',apellido_materno),telefono\n" +
                "FROM cliente WHERE estado=1;";
        List<Cliente> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Cliente cliente = entityManager.find(Cliente.class,id);
        cliente.setEstado((byte)0);
        entityManager.merge(cliente);
    }

    @Override
    public void crear(Cliente cliente) {
        cliente.setEstado((byte)1);
        entityManager.persist(cliente);
    }
    public void crearCliente(ClienteYLugarRequest request){
        Cliente cliente = request.getCliente();
        Lugar lugar = request.getLugar();
        cliente.setEstado((byte)1);
        entityManager.persist(cliente);
        String query = "INSERT INTO lugar(idCliente,nombre,direccion,notas,latitud,longitud,estado)\n" +
                "\tVALUES(:idCliente,:nombre,:direccion,:notas,:latitud,:longitud,:estado);";
        Query insertQuery = entityManager.createNativeQuery(query)
                .setParameter("idCliente",cliente.getIdCliente())
                .setParameter("nombre",lugar.getNombre())
                .setParameter("direccion",lugar.getDireccion())
                .setParameter("notas",lugar.getNotas())
                .setParameter("latitud",lugar.getLatitud())
                .setParameter("longitud",lugar.getLongitud())
                .setParameter("estado",1);

        insertQuery.executeUpdate();

    }

    @Override
    public Cliente getPersona(Long id) {
        Cliente cliente = entityManager.find(Cliente.class,id);
        return cliente;
    }

    @Override
    public void modificar(Cliente cliente) {
        Cliente clienteViejo = entityManager.find(Cliente.class,cliente.getIdCliente());
        cliente.setFecha_creacion(clienteViejo.getFecha_creacion());
        entityManager.merge(cliente);
    }

    public List<ClienteLugar> getClientesXId(String carnet) {
        String query = "SELECT C.idCliente,L.idLugar,C.carnet,CONCAT(C.nombre,' ',C.apellido,' ',C.apellido_materno),\n" +
                "\tL.nombre,L.direccion\n" +
                "FROM cliente C\n" +
                "\tINNER JOIN Lugar L ON C.idCliente=L.idCliente\n" +
                "WHERE C.carnet=:carnet";
        List<ClienteLugar> resultado = entityManager.createNativeQuery(query)
                .setParameter("carnet",carnet)
                .getResultList();
        return resultado;
    }
    public List<ClienteLugar> getTodosLosClientes() {
        String query = "SELECT C.idCliente,L.idLugar,C.carnet,CONCAT(C.nombre,' ',C.apellido,' ',C.apellido_materno),\n" +
                "\tL.nombre,L.direccion\n" +
                "FROM cliente C\n" +
                "\tINNER JOIN Lugar L ON C.idCliente=L.idCliente WHERE C.estado=1\n";
        List<ClienteLugar> resultado = entityManager.createNativeQuery(query)
                .getResultList();
        return resultado;
    }
}

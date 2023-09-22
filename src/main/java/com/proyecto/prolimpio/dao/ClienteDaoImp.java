package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Cliente;
import com.proyecto.prolimpio.models.ClienteYLugarRequest;
import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Lugar;
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
        String query = "SELECT idCliente,CONCAT(nombre,' ',apellido,' ',apellido_materno),telefono,correo\n" +
                "FROM cliente";
        List<Cliente> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Cliente cliente = entityManager.find(Cliente.class,id);
        entityManager.remove(cliente);
    }

    @Override
    public void crear(Cliente cliente) {
        entityManager.merge(cliente);
    }
    public void crearCliente(ClienteYLugarRequest request){
        Cliente cliente = request.getCliente();
        Lugar lugar = request.getLugar();
        entityManager.persist(cliente);
        String query = "INSERT INTO lugar(idCliente,nombre,direccion,notas,latitud,longitud)\n" +
                "\tVALUES(:idCliente,:nombre,:direccion,:notas,:latitud,:longitud);";
        Query insertQuery = entityManager.createNativeQuery(query)
                .setParameter("idCliente",cliente.getIdCliente())
                .setParameter("nombre",lugar.getNombre())
                .setParameter("direccion",lugar.getDireccion())
                .setParameter("notas",lugar.getNotas())
                .setParameter("latitud",lugar.getLatitud())
                .setParameter("longitud",lugar.getLongitud());

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
}

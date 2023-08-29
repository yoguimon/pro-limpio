package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Cliente;
import com.proyecto.prolimpio.models.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional//rolback=proceso completo
public class EmpleadoDaoImp implements CrudDao<Empleado> {

    @PersistenceContext //carga el objeto entitymanager
    EntityManager entityManager;
    @Override
    public List<Empleado> getTodos() {
        String query = "SELECT idEmpleado,carnet,nombre,apellido,puesto,telefono\n" +
                        "FROM empleado";
        //String query = "FROM Empleado";
        List<Empleado> resultado = entityManager.createNativeQuery(query).getResultList();
        //List<Empleado> resultado = entityManager.createQuery(query).getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Empleado empleado = entityManager.find(Empleado.class,id);
        entityManager.remove(empleado);
    }

    @Override
    public void crear(Empleado empleado) {
        entityManager.persist(empleado);
        String query = "INSERT INTO usuario(idEmpleado,email,pass,rol)\n" +
                "\tVALUES(:idEmpleado,:email,:pass,:rol);";
        Query insertQuery = entityManager.createNativeQuery(query)
                .setParameter("idEmpleado",empleado.getIdEmpleado())
                .setParameter("email",empleado.getCorreo())
                .setParameter("pass",empleado.getCarnet())
                .setParameter("rol",empleado.getPuesto());

        insertQuery.executeUpdate();
    }

    @Override
    public Empleado getPersona(Long id) {
        Empleado empleado = entityManager.find(Empleado.class,id);
        return empleado;
    }

    @Override
    public void modificar(Empleado empleado) {
        Empleado vieja = entityManager.find(Empleado.class, empleado.getIdEmpleado());
        mapear(empleado,vieja);
        entityManager.merge(vieja);
    }

    private void mapear(Empleado empleado, Empleado vieja) {
        vieja.setCarnet(empleado.getCarnet());
        vieja.setNombre(empleado.getNombre());
        vieja.setApellido(empleado.getApellido());
        vieja.setFecha_contratacion(empleado.getFecha_contratacion());
        vieja.setPuesto(empleado.getPuesto());
        vieja.setSalario(empleado.getSalario());
        vieja.setFecha_nacimiento(empleado.getFecha_nacimiento());
        vieja.setEstado_civil(empleado.getEstado_civil());
        vieja.setSexo(empleado.getSexo());
        vieja.setDireccion(empleado.getDireccion());
        vieja.setTelefono(empleado.getTelefono());
        vieja.setCorreo(empleado.getCorreo());
        vieja.setFoto(empleado.getFoto());
    }
}

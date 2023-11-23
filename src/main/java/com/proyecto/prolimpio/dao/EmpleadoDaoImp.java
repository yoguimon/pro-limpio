package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.ClienteLugar;
import com.proyecto.prolimpio.models.Empleado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
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
                        "FROM empleado WHERE estado=1;";
        List<Empleado> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }
    public List<Empleado> getAllEmployes(){
        String query = "SELECT idEmpleado,CONCAT(nombre,' ',apellido,' ',apellido_materno),carnet,puesto,telefono FROM empleado WHERE estado=1"; // Asegúrate de que "Empleado" es el nombre de tu clase de entidad
        List<Empleado> resultado = entityManager.createNativeQuery(query).getResultList();
        return resultado;
    }
    public List<Empleado> getTodosEmpleados() {
        String query = "SELECT idEmpleado,carnet,nombre,apellido,puesto,telefono\n" +
                "FROM empleado WHERE puesto=:puesto AND estado=1;";
        List<Empleado> resultado = entityManager.createNativeQuery(query).setParameter("puesto","Auxiliar Limpieza").getResultList();
        return resultado;
    }
    public List<Empleado> getTodosSupervisores() {
        String query = "SELECT idEmpleado,carnet,nombre,apellido,puesto,telefono\n" +
                "FROM empleado WHERE puesto=:puesto AND estado=1;";
        List<Empleado> resultado = entityManager.createNativeQuery(query).setParameter("puesto","Supervisor").getResultList();
        return resultado;
    }

    @Override
    public void eliminar(Long id) {
        Empleado empleado = entityManager.find(Empleado.class,id);
        empleado.setEstado((byte)0);
        entityManager.merge(empleado);
    }

    @Override
    public void crear(Empleado empleado) {
        empleado.setEstado((byte)1);
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
    public Object[] getEmpleado(Long id){
        String query="SELECT * FROM empleado WHERE idEmpleado=:id";
        Object[] resultado =(Object[]) entityManager.createNativeQuery(query).setParameter("id",id).getSingleResult();
        return resultado;
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
        vieja.setApellido_materno(empleado.getApellido_materno());
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

    public List<Empleado> getEmpleadoXCarnet(String carnet) {
        String jpqlQuery = "SELECT * FROM Empleado WHERE carnet LIKE :carnet AND estado=1";
        List<Empleado> resultado = entityManager.createNativeQuery(jpqlQuery)
                .setParameter("carnet",carnet + "%")
                .getResultList();
        return resultado;
    }

    public List<Empleado> getSupervisoresXCarnet(String carnet) {
        String jpqlQuery = "SELECT * FROM Empleado WHERE carnet LIKE :carnet AND estado=1 AND puesto=:puesto";
        List<Empleado> resultado = entityManager.createNativeQuery(jpqlQuery)
                .setParameter("carnet",carnet + "%")
                .setParameter("puesto","Supervisor")
                .getResultList();
        return resultado;
    }
    public List<Object[]> getAsignacionesEmpleado(int id){
        String query = "SELECT A.idAsignacion,L.nombre,L.direccion,A.fecha_inicio,A.fecha_fin,A.turno\n" +
                "FROM asignacion A \n" +
                "\tINNER JOIN asignacion_empleado AE ON A.idAsignacion=AE.idAsignacion\n" +
                "    INNER JOIN lugar L ON A.idLugar=L.idLugar\n" +
                "WHERE AE.idEmpleado=:id AND A.estado=1";
        List<Object[]> asignaciones = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return asignaciones;
    }
}

package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.AsistenciaReporte;
import com.proyecto.prolimpio.dto.AsistenciaResponse;
import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.models.Asistencia;
import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.models.Lugar;
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
        asistencia.setTipo(asistenciaResponse.getTipo());
        entityManager.persist(asistencia);


    }

    public List<AsistenciaReporte> getTodasAsistencia(Long id) {
        String query = "SELECT CONCAT(E.nombre,' ',E.apellido,' ',E.apellido_materno),E.carnet,\n" +
                "       DATE(A.fecha_hora),TIME(A.fecha_hora),A.tipo\n" +
                "FROM empleado E \n" +
                "\tINNER JOIN asistencia A ON E.idEmpleado=A.idEmpleado\n" +
                "WHERE E.idEmpleado=:id";
        List<AsistenciaReporte> resultado = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return resultado;
    }
    public List<Asistencia> getTodasAsistencias(Long id){
        String query = "SELECT * \n" +
                "FROM asistencia\n" +
                "WHERE idEmpleado=:id";
        List<Asistencia> resultado = entityManager.createNativeQuery(query)
                .setParameter("id",id)
                .getResultList();
        return resultado;
    }

    public List<Object[]> getAsistenciasXFechas(DtoFechas dtoFechas) {
        String query="SELECT A.idAsistencia,CONCAT(E.nombre,' ',E.apellido,' ',E.apellido_materno),\n" +
                "\t\tA.latitud,A.longitud,A.fecha_hora,A.tipo\n" +
                "FROM asistencia A\n" +
                "\tINNER JOIN empleado E ON A.idEmpleado=E.idEmpleado\n" +
                "WHERE A.fecha_hora >= :fechaIni AND A.fecha_hora <= :fechaFin";
        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("fechaIni",dtoFechas.getFecha_inicio())
                .setParameter("fechaFin",dtoFechas.getFecha_fin())
                .getResultList();
        return resultado;
    }
}

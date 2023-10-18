package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
@Transactional
public class AsignacionDaoImp {
    @PersistenceContext
    EntityManager entityManager;
    public void crearAsignacion(AsignacionResponse asignacionResponse){
        //creo asignacion
        Asignacion asignacion = new Asignacion();
        int idLugar = asignacionResponse.getLugarIds().get(0);
        Lugar lugar = entityManager.find(Lugar.class,idLugar);
        asignacion.setLugar(lugar);
        asignacion.setTotal(asignacionResponse.getTotal());
        asignacion.setFecha_inicio(asignacionResponse.getFecha_inicio());
        asignacion.setFecha_fin(asignacionResponse.getFecha_fin());
        asignacion.setHora_inicio(asignacionResponse.getHora_inicio());
        asignacion.setHora_fin(asignacionResponse.getHora_fin());
        asignacion.setEstado((byte)1);

        List<Empleado> empleados = new ArrayList<>();
        List<Integer> empleadosIds = new ArrayList<>();
        empleadosIds.addAll(asignacionResponse.getSupervisoresIds());
        empleadosIds.addAll(asignacionResponse.getEmpleadosIds());
        for(int i=0;i<empleadosIds.size();i++){
            Empleado aux = entityManager.find(Empleado.class,empleadosIds.get(i));

            empleados.add(aux);
        }
        // Crear listas para IDs y precios
        List<Integer> listaIds = new ArrayList<>();
        List<Double> listaPrecios = new ArrayList<>();
        // Recorrer el HashMap y dividir los elementos en las listas
        for (HashMap.Entry<Integer, Double> entry : asignacionResponse.getServicios().entrySet()) {
            listaIds.add(entry.getKey());
            listaPrecios.add(entry.getValue());
        }
        List<Servicio> servicios = new ArrayList<>();
        for(int i=0;i<listaIds.size();i++){
            Servicio aux = entityManager.find(Servicio.class,listaIds.get(i));
            servicios.add(aux);
        }
        //asignacion.setEmpleados(empleados);
        //asignacion.setServicios(servicios);
        entityManager.persist(asignacion);

        // Insertar en la tabla intermedia AsignacionEmpleado
        for (Empleado empleado : empleados) {
            AsignacionEmpleado asignacionEmpleado = new AsignacionEmpleado();
            asignacionEmpleado.setAsignacion(asignacion);
            asignacionEmpleado.setEmpleado(empleado);
            asignacionEmpleado.setCargo(empleado.getPuesto());
            entityManager.persist(asignacionEmpleado);
        }

        // Insertar en la tabla intermedia AsignacionServicio
        for (int j=0;j<servicios.size();j++) {
            AsignacionServicio asignacionServicio = new AsignacionServicio();
            asignacionServicio.setAsignacion(asignacion);
            Servicio servicio = servicios.get(j);
            asignacionServicio.setServicio(servicio);
            asignacionServicio.setTotalServicio(listaPrecios.get(j));
            entityManager.persist(asignacionServicio);
        }
    }
}

package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.EmpleadoDaoImp;
import com.proyecto.prolimpio.models.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpleadoController {
    @Autowired//carga el valor del repositorio
    private EmpleadoDaoImp empleadoDaoImp;

    @RequestMapping(value="api/empleados", method = RequestMethod.GET)
    public List<Empleado> getUsuarios(){
        return empleadoDaoImp.getTodos();
    }
    @PostMapping("api/empleados")
    public void registrarEmpleado(@RequestBody Empleado empleado){
        empleadoDaoImp.crear(empleado);
    }
    @DeleteMapping("api/empleados/{id}")
    public void eliminar(@PathVariable Long id){
        empleadoDaoImp.eliminar(id);
    }
    @GetMapping("api/empleados/{id}")
    public Object[] getPersona(@PathVariable Long id){
        return empleadoDaoImp.getEmpleado(id);
    }
    @GetMapping("api/empleadoXCarnet/{carnet}")
    public List<Empleado> getEmpleado(@PathVariable String carnet){
        return empleadoDaoImp.getEmpleadoXCarnet(carnet);
    }
    @GetMapping("api/supervisorXCarnet/{carnet}")
    public List<Empleado> getSupervisores(@PathVariable String carnet){
        return empleadoDaoImp.getSupervisoresXCarnet(carnet);
    }
    @PutMapping("api/empleados")
    public void modificarEmpleado(@RequestBody Empleado empleado){
        empleadoDaoImp.modificar(empleado);
    }
    @GetMapping("api/supervisores/todos")
    public List<Empleado> getTodosSupervisor(){
        return empleadoDaoImp.getTodosSupervisores();
    }
    @GetMapping("api/empleados/todos")
    public List<Empleado> getTodosEmpleados(){
        return empleadoDaoImp.getTodosEmpleados();
    }
    @GetMapping("api/empleados/asistencia")
    public List<Empleado> getAllEmployes(){
        return empleadoDaoImp.getAllEmployes();
    }
    @GetMapping("api/empleados/reporte/{id}")
    public List<Object[]> getAsignacionesEmpleado(@PathVariable int id){
        return empleadoDaoImp.getAsignacionesEmpleado(id);
    }
}

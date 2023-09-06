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
    public Empleado getPersona(@PathVariable Long id){
        return empleadoDaoImp.getPersona(id);
    }


    @PutMapping("api/empleados")
    public void modificarEmpleado(@RequestBody Empleado empleado){
        empleadoDaoImp.modificar(empleado);
    }
}

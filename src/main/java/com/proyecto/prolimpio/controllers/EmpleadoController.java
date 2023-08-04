package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.EmpleadoDao;
import com.proyecto.prolimpio.dao.EmpleadoDaoImp;
import com.proyecto.prolimpio.models.Persona;
import com.proyecto.prolimpio.services.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpleadoController {
    @Autowired//carga el valor del repositorio
    private EmpleadoDao empleadoDao;

    @RequestMapping(value="api/empleados", method = RequestMethod.GET)
    public List<Persona> getUsuarios(){
        return empleadoDao.getEmpleados();
    }
    @PostMapping("api/empleados")
    public void registrarEmpleado(@RequestBody Persona persona){
        empleadoDao.crear(persona);
    }
    @DeleteMapping("api/empleados/{id}")
    public void eliminar(@PathVariable Long id){
        empleadoDao.eliminar(id);
    }
    @GetMapping("api/empleados/{id}")
    public Persona getPersona(@PathVariable Long id){
        return empleadoDao.getPersona(id);
    }

    @PostMapping("api/modificar")
    public void modificarEmpleado(@RequestBody Persona persona){
        empleadoDao.modificar(persona);
    }
}

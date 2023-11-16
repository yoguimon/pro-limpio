package com.proyecto.prolimpio.controllers;

import com.proyecto.prolimpio.dao.ClienteDaoImp;
import com.proyecto.prolimpio.dao.CrudDao;
import com.proyecto.prolimpio.dto.DtoClienteEditado;
import com.proyecto.prolimpio.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClienteController {
    @Autowired//carga el valor del repositorio
    private ClienteDaoImp clienteDaoImp;

    @RequestMapping(value="api/clientes", method = RequestMethod.GET)
    public List<Cliente> getClientes(){
        return clienteDaoImp.getTodos();
    }
    @GetMapping("api/clientesXCarnet/{carnet}")
    public List<ClienteLugar> getClientesXCarnet(@PathVariable String carnet){
        return clienteDaoImp.getClientesXId(carnet);
    }
    @GetMapping("api/clientes/asignacion")
    public List<ClienteLugar> getTodosClientes(){
        return clienteDaoImp.getTodosLosClientes();
    }
    @PostMapping("api/clientes")
    public void registrarCliente(@RequestBody ClienteYLugarRequest request){
        clienteDaoImp.crearCliente(request);
    }
    @DeleteMapping("api/clientes/{id}")
    public void eliminarCliente(@PathVariable Long id){
        clienteDaoImp.eliminar(id);
    }
    @GetMapping("api/clientes/{id}")
    public Cliente getPersona(@PathVariable Long id){
        return clienteDaoImp.getPersona(id);
    }
    @PutMapping("api/clientes/edicion")
    public void modificarCliente(@RequestBody Cliente cliente){
        clienteDaoImp.modificar(cliente);
    }
}

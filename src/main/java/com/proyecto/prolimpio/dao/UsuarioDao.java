package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional//rolback=proceso completo
public class UsuarioDao {
    @PersistenceContext //carga el objeto entitymanager
    EntityManager entityManager;
    public void registrar(Usuario usuario){
        entityManager.merge(usuario);
    }

    public String verificarUsuario(Usuario usuario) {
        //si existe retorna el rol Supervisor,Auxiliar Limpieza
        //si no retorna Fail
        String query = "FROM Usuario WHERE email = :email";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email",usuario.getEmail())
                .getResultList();

        if(lista.isEmpty()){
            return "Fail";
        }
        String passwordHashed = lista.get(0).getPass();

        Argon2 argon2= Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if(argon2.verify(passwordHashed,usuario.getPass())){
            Usuario aux = lista.get(0);
            String rol = aux.getRol();
            if(rol.equals("Supervisor")){
                return "Supervisor";
            }else{
                if(rol.equals("Auxiliar Limpieza")){
                    return "Auxiliar Limpieza";
                }else{
                    return "Fail";
                }
            }

        }
        return "Fail";
    }
}

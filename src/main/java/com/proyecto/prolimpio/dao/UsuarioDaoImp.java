package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional//rolback=proceso completo
public class UsuarioDaoImp implements CrudDao<Usuario>{
    @PersistenceContext //carga el objeto entitymanager
    EntityManager entityManager;

    public Usuario verificarUsuario(Usuario usuario) {
        //si existe retorna el rol Supervisor,Auxiliar Limpieza
        //si no retorna Fail
        try{
            String query = "FROM Usuario WHERE email = :email";
            List<Usuario> lista = entityManager.createQuery(query)
                    .setParameter("email",usuario.getEmail())
                    .getResultList();
            if(!lista.isEmpty()){
                String passwordHashed = lista.get(0).getPass();
                Argon2 argon2= Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
                if(argon2.verify(passwordHashed,usuario.getPass())){
                    return lista.get(0);
                }
            }
            //return "Fail";
            return null;
        }catch (Exception ex){
            ex.printStackTrace();
        }
        //return "Fail";
        return null;
    }

    public boolean getEmp(Usuario usuario){//obtengo verdad si usuario es nuevo ya que la pass=carnet
        String query = "SELECT COUNT(*) FROM empleado WHERE carnet = :carnet AND correo = :email";
        int count = ((Number) entityManager.createNativeQuery(query)
                .setParameter("carnet", usuario.getPass())
                .setParameter("email", usuario.getEmail())
                .getSingleResult()).intValue();
        return count > 0;
    }
    @Override
    public List<Usuario> getTodos() {
        return null;
    }

    @Override
    public void eliminar(Long id) {

    }

    @Override
    public void crear(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario getPersona(Long id) {
        return null;
    }

    @Override
    public void modificar(Usuario usuario) {

    }

    public boolean insertPass(Usuario usuario) {
        try{
            //System.out.println("correo$"+usuario.getEmail());
            String jpqlQuery = "SELECT u FROM Usuario u WHERE u.email = :email";
            TypedQuery<Usuario> query = entityManager.createQuery(jpqlQuery, Usuario.class)
                    .setParameter("email", usuario.getEmail());
            List<Usuario> usuarios = query.getResultList();

           if(!usuarios.isEmpty()){
               Usuario aux = usuarios.get(0);

               aux.setPass(usuario.getPass());
               entityManager.merge(aux);
               return true;
           }
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    public boolean verificarSiExiste(String email) {
        try {
            String sql = "SELECT email FROM usuario WHERE email = :email";
            List<String> results = entityManager
                    .createNativeQuery(sql)
                    .setParameter("email", email)
                    .getResultList();
            // Verificar si la lista de resultados no está vacía
            return !results.isEmpty();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

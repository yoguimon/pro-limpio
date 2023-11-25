package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.AsignacionResponse;
import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.dto.VerificarAsignacionDTO;
import com.proyecto.prolimpio.models.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Repository
@Transactional
public class AsignacionDaoImp {
    @PersistenceContext
    EntityManager entityManager;
    String query = "";
    public ResponseEntity<Resource> crearAsignacion(AsignacionResponse asignacionResponse){
        //creo asignacion
        Asignacion asignacion = new Asignacion();
        int idLugar = asignacionResponse.getLugarIds().get(0);
        Lugar lugar = entityManager.find(Lugar.class,idLugar);
        asignacion.setLugar(lugar);
        asignacion.setTotal(asignacionResponse.getTotal());
        asignacion.setFecha_inicio(asignacionResponse.getFecha_inicio());
        asignacion.setFecha_fin(asignacionResponse.getFecha_fin());
        asignacion.setTurno(asignacionResponse.getTurno());
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
        return generarPdf(asignacion.getIdAsignacion());
    }

    public List<EmpleadoAux> verificarFechasYEmpleados(VerificarAsignacionDTO verificarAsignacionDTO) {
        query ="SELECT A.idAsignacion,CONCAT(E.nombre,' ',E.apellido,' ',E.apellido_materno),\n" +
                "\t\tAE.cargo,A.fecha_inicio,A.fecha_fin,A.turno,L.nombre\n" +
                "FROM asignacion A\n" +
                "\t INNER JOIN asignacion_empleado AE ON A.idAsignacion=AE.idAsignacion\n" +
                "     INNER JOIN empleado E ON AE.idEmpleado=E.idEmpleado\n" +
                "     INNER JOIN lugar L ON A.idLugar=L.idLugar\n" +
                "WHERE fecha_inicio <= :fecha_fin AND fecha_fin >= :fecha_inicio\n" +
                "\t\tAND turno = :turno\n" +
                "        AND AE.idEmpleado IN :ids";
        List<EmpleadoAux> resultado = entityManager.createNativeQuery(query)
                .setParameter("fecha_inicio",verificarAsignacionDTO.getFecha_inicio())
                .setParameter("fecha_fin",verificarAsignacionDTO.getFecha_fin())
                .setParameter("turno",verificarAsignacionDTO.getTurno())
                .setParameter("ids",verificarAsignacionDTO.getEmpleadosIds())
                .getResultList();
        return resultado;
    }

    public ResponseEntity<Resource> generarPdf(int id) {
        List<Object[]> empleados = empleadosAsignados(id);
        List<Object[]> servicios = serviciosAsignados(id);
        Object[] asigncionDadoId = datosServicio(id);
        Object[] lugarYCliente = lugarYClienteAsignados(id);
        try {
            final File file = ResourceUtils.getFile("classpath:reportes/reporteAsignacion.jasper");
            final File imgLogo = ResourceUtils.getFile("classpath:imagenes/logo.png");
            final JasperReport report = (JasperReport) JRLoader.loadObject(file);

            HashMap<String, Object> parameters = new HashMap<>();
            parameters.put("logoProlimpio", new FileInputStream(imgLogo));

            List<Map<String, Object>> dataEmpleados = new ArrayList<>();
            int cont=1;
            for (Object[] empleado : empleados) {
                Map<String, Object> map = new HashMap<>();
                map.put("nro", cont);
                map.put("nombre", empleado[1]);
                map.put("carnet", empleado[2]);
                map.put("cargo", empleado[3]);
                map.put("telefono", empleado[4]);
                dataEmpleados.add(map);
                cont++;
            }
            List<Map<String, Object>> dataServicios = new ArrayList<>();
            cont=1;
            for (Object[] servicio : servicios) {
                Map<String, Object> map = new HashMap<>();
                map.put("nro", cont);
                map.put("nombre", servicio[1]);
                map.put("categoria", servicio[2]);
                map.put("total", servicio[3].toString());
                dataServicios.add(map);
                cont++;
            }
            JRBeanCollectionDataSource dataSourceEmpleados = new JRBeanCollectionDataSource(dataEmpleados);
            JRBeanCollectionDataSource dataSourceServicios = new JRBeanCollectionDataSource(dataServicios);
            parameters.put("dsEmp", dataSourceEmpleados);
            parameters.put("dsServicios", dataSourceServicios);
            parameters.put("cliente",lugarYCliente[1]);
            parameters.put("lugar",lugarYCliente[0]);

            Date inicio = (Date) asigncionDadoId[3];
            SimpleDateFormat formato = new SimpleDateFormat("d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
            String fechaInicio = formato.format(inicio);
            Date fin = (Date) asigncionDadoId[4];
            String fechaFin = formato.format(fin);
            Date actual = new Date();
            String fecha = formato.format(actual);

            parameters.put("fechaini", fechaInicio);
            parameters.put("fechafin", fechaFin);
            parameters.put("turno",asigncionDadoId[5]);
            parameters.put("nroa",asigncionDadoId[0]);
            parameters.put("email","jose@gmail.com");
            parameters.put("totalfinal",asigncionDadoId[2]);
            parameters.put("direccion",lugarYCliente[2]);
            parameters.put("fecha",fecha);

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
            byte[] reporte = JasperExportManager.exportReportToPdf(jasperPrint);
            String sdf = (new SimpleDateFormat("dd/MM/yyyy")).format(new Date());//para la fecha
            StringBuilder stringBuilder = new StringBuilder().append("InvoicePDF:");
            ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                    .filename(stringBuilder.append((1))
                            .append("generateDate:")
                            .append(sdf)
                            .append(".pdf")
                            .toString())
                    .build();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(contentDisposition);
            return ResponseEntity.ok().contentLength((long)reporte.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .headers(headers).body(new ByteArrayResource(reporte));
        }catch (Exception ex){
            ex.printStackTrace();
        }
        //ResponseEntity.noContent().build();
        return null;
    }

    public List<Object[]> empleadosAsignados(int id){
        query = "SELECT A.idEmpleado, CONCAT(E.nombre,' ',E.apellido,' ',apellido_materno),E.carnet,A.cargo,E.telefono " +
                "FROM asignacion_empleado A " +
                "INNER JOIN empleado E ON A.idEmpleado=E.idEmpleado " +
                "WHERE idAsignacion=:id";

        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getResultList();

        return resultado;
    }
    public List<Object[]> serviciosAsignados(int id){
        query = "SELECT A.idServicio, S.descripcion, S.categoria, A.total_servicio\n" +
                "FROM servicio S\n" +
                "\t\tINNER JOIN asignacion_servicio A ON S.idServicio=A.idServicio\n" +
                "WHERE idAsignacion=:id";

        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getResultList();

        return resultado;
    }
    public Object[] lugarYClienteAsignados(int id){
        query = "SELECT L.nombre,CONCAT(C.nombre,' ',C.apellido,' ',C.apellido_materno),L.direccion\n" +
                "FROM asignacion A\n" +
                "\tINNER JOIN lugar L ON A.idLugar=L.idLugar\n" +
                "    INNER JOIN cliente C ON L.idCliente=C.idCliente\n" +
                "WHERE A.idAsignacion=:id";
        List<Object[]> resultado = entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getResultList();
        return resultado.get(0);
    }
    public Object[] datosServicio(int id) {
        String query = "SELECT * FROM asignacion WHERE idAsignacion = :id";
        Object[] servicio = (Object[]) entityManager.createNativeQuery(query)
                .setParameter("id", id)
                .getSingleResult();
        return servicio;
    }
    //Aqui muestro asignaciones de la tabla asignacion sin detalles solo ids
    public List<Object[]> asignacionesPendientes(){
        query= "SELECT * FROM asignacion WHERE estado=1 ORDER BY idAsignacion DESC";
        List<Object[]> asignaciones = entityManager.createNativeQuery(query)
                .getResultList();
        return asignaciones;
    }
    public List<Object[]> asignacionesPendientes(DtoFechas dtoFechas){
        query= "SELECT * FROM asignacion \n" +
                "WHERE estado=1 AND fecha_inicio >= :fechaIni AND fecha_fin <= :fechaFin\n" +
                "ORDER BY idAsignacion DESC";
        List<Object[]> asignaciones = entityManager.createNativeQuery(query)
                .setParameter("fechaIni",dtoFechas.getFecha_inicio())
                .setParameter("fechaFin",dtoFechas.getFecha_fin())
                .getResultList();
        return asignaciones;
    }
    //Aqui obtengo todos las asignaciones conn detalles
    public List<AsignacionReporte> getTodasAsignacionesPendientes(){
        List<Object[]> asignaciones = asignacionesPendientes();
        List<AsignacionReporte> asignacionesPendientes= new ArrayList<AsignacionReporte>();
        for(Object[] asignacion:asignaciones){
            AsignacionReporte asignacionReporte = new AsignacionReporte();
            asignacionReporte.setClienteLugar(lugarYClienteAsignados((int)asignacion[0]));
            asignacionReporte.setServicioId(datosServicio((int)asignacion[0]));
            asignacionesPendientes.add(asignacionReporte);
        }
        return asignacionesPendientes;
    }

    public void finalizarAsignacion(int id) {
        Asignacion asignacion = entityManager.find(Asignacion.class,id);
        asignacion.setEstado((byte)0);
        entityManager.merge(asignacion);
    }

    public List<AsignacionReporte> buscarPorRangoFechas(DtoFechas dtoFechas) {
        List<Object[]> asignaciones = asignacionesPendientes(dtoFechas);
        List<AsignacionReporte> asignacionesPendientes= new ArrayList<AsignacionReporte>();
        for(Object[] asignacion:asignaciones){
            AsignacionReporte asignacionReporte = new AsignacionReporte();
            asignacionReporte.setClienteLugar(lugarYClienteAsignados((int)asignacion[0]));
            asignacionReporte.setServicioId(datosServicio((int)asignacion[0]));
            asignacionesPendientes.add(asignacionReporte);
        }
        return asignacionesPendientes;
    }
    public Object[] getTodasAsignacionesFinalizadasPorMes() {
        String query = "SELECT IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 1 THEN 1 ELSE 0 END), 0) AS Ene,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 2 THEN 1 ELSE 0 END), 0) AS Feb,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 3 THEN 1 ELSE 0 END), 0) AS Mar,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 4 THEN 1 ELSE 0 END), 0) AS Abr,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 5 THEN 1 ELSE 0 END), 0) AS May,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 6 THEN 1 ELSE 0 END), 0) AS Jun,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 7 THEN 1 ELSE 0 END), 0) AS Jul,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 8 THEN 1 ELSE 0 END), 0) AS Ago,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 9 THEN 1 ELSE 0 END), 0) AS Sep,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 10 THEN 1 ELSE 0 END), 0) AS Oct,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 11 THEN 1 ELSE 0 END), 0) AS Nov,\n" +
                "       IFNULL(SUM(CASE WHEN MONTH(fecha_fin) = 12 THEN 1 ELSE 0 END), 0) AS Dic\n" +
                "FROM asignacion\n" +
                "WHERE estado = 0\n" +
                "GROUP BY YEAR(fecha_fin)";
        Object[] asignacionesFinalizadas = (Object[]) entityManager.createNativeQuery(query)
                .getSingleResult();
        return asignacionesFinalizadas;
    }

    public Object[] getDatosIndex(){
        String query="SELECT \n" +
                "    (SELECT COUNT(idAsignacion) FROM asignacion WHERE estado = 1),\n" +
                "    (SELECT COUNT(idEmpleado) FROM empleado WHERE estado = 1),\n" +
                "    (SELECT COUNT(idServicio) FROM servicio WHERE estado = 1),\n" +
                "    (SELECT COUNT(idCliente) FROM cliente WHERE estado = 1);";
        Object[] datos = (Object[]) entityManager.createNativeQuery(query)
                .getSingleResult();
        return datos;
    }
}

package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.dto.DtoFechas;
import com.proyecto.prolimpio.models.Empleado;
import com.proyecto.prolimpio.util.ConvertirDecimalATexto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PersistenceContext;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
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

import static com.proyecto.prolimpio.util.ConvertirDecimalATexto.convertirNumero;


@Repository
@Transactional
public class ReporteDaoImp {
    @PersistenceContext
    EntityManager entityManager;
    @Autowired
    EmpleadoDaoImp empleadoDaoImp;
    String query = "";///////
    public ResponseEntity<Resource> getReporteEnPdf(HashMap<String, Object> parameters, String nombreJasper) {
        try {
            final File file = ResourceUtils.getFile("classpath:reportes/"+nombreJasper+".jasper");
            final File imgLogo = ResourceUtils.getFile("classpath:imagenes/logo.png");
            final JasperReport report = (JasperReport) JRLoader.loadObject(file);
            parameters.put("logo", new FileInputStream(imgLogo));
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
        return null;
    }
    public ResponseEntity<Resource> imprimirTodo(){
        List<Object[]> asignaciones = reporteTodasLasAsignaciones();
        Object[] fechas = fechaInicioFinTodasAsignaciones();
        LocalDate fechaInicio = LocalDate.parse(fechas[0].toString());
        LocalDate fechaFin = LocalDate.parse(fechas[1].toString());
        DtoFechas dtoFechas = new DtoFechas();
        dtoFechas.setFecha_inicio(fechaInicio);
        dtoFechas.setFecha_fin(fechaFin);
        return prepararReporteAsignacion(asignaciones,dtoFechas);
    }
    public ResponseEntity<Resource> imprimirPorFechas(DtoFechas dtoFechas){
        List<Object[]> asignaciones = reportePorFechaDeLasAsignaciones(dtoFechas);
        return prepararReporteAsignacion(asignaciones,dtoFechas);
    }
    public ResponseEntity<Resource> prepararReporteAsignacion(List<Object[]> asignaciones, DtoFechas dtofechas){
        HashMap<String, Object> parameters = new HashMap<>();
        List<Map<String, Object>> dataAsignaciones = new ArrayList<>();
        int cont=1;
        double total=0.0;
        for (Object[] asignacion : asignaciones) {
            double costo = Double.parseDouble(asignacion[5]+"");
            Map<String, Object> map = new HashMap<>();
            map.put("nro", cont);
            map.put("cliente", asignacion[0]);
            map.put("lugar", asignacion[1]);
            map.put("direccion", asignacion[2]);
            map.put("fecha", asignacion[3]);
            map.put("turno",asignacion[4]);
            map.put("costo",asignacion[5]);
            dataAsignaciones.add(map);
            cont++;
            total=total+costo;

        }
        JRBeanCollectionDataSource dataSourceAsignaciones = new JRBeanCollectionDataSource(dataAsignaciones);
        parameters.put("dsTablaGeneral", dataSourceAsignaciones);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
        LocalDate inicio = dtofechas.getFecha_inicio();
        LocalDate fin = dtofechas.getFecha_fin();
        String fechaInicio = inicio.format(formatter);
        String fechaFin = fin.format(formatter);

        parameters.put("fechaInicio", fechaInicio);
        parameters.put("fechaFin", fechaFin);
        parameters.put("total",total);
        parameters.put("son",convertirNumero(total));
        String nombreJasper = "reporteGeneral";
        return getReporteEnPdf(parameters,nombreJasper);
    }
    public List<Object[]> reporteTodasLasAsignaciones(){
        query= "SELECT CONCAT(C.nombre,' ',C.apellido,' ',C.apellido_materno),\n" +
                "L.nombre,L.direccion,CONCAT(A.fecha_inicio,' a ',A.fecha_fin),\n" +
                "A.turno,A.total\n" +
                "FROM asignacion A\n" +
                "\tINNER JOIN lugar L ON A.idLugar=L.idLugar\n" +
                "    INNER JOIN cliente C ON L.idCliente=C.idCliente\n" +
                "WHERE A.estado=1";
        List<Object[]> asignaciones = entityManager.createNativeQuery(query)
                .getResultList();
        return asignaciones;
    }
    public List<Object[]> reportePorFechaDeLasAsignaciones(DtoFechas dtoFechas){
        query= "SELECT CONCAT(C.nombre,' ',C.apellido,' ',C.apellido_materno),\n" +
                "L.nombre,L.direccion,CONCAT(A.fecha_inicio,' a ',A.fecha_fin),\n" +
                "A.turno,A.total\n" +
                "FROM asignacion A\n" +
                "\tINNER JOIN lugar L ON A.idLugar=L.idLugar\n" +
                "    INNER JOIN cliente C ON L.idCliente=C.idCliente\n" +
                "WHERE A.estado=1 AND A.fecha_inicio >= :fechaIni AND A.fecha_fin <= :fechaFin";
        List<Object[]> asignaciones = entityManager.createNativeQuery(query)
                .setParameter("fechaIni",dtoFechas.getFecha_inicio())
                .setParameter("fechaFin",dtoFechas.getFecha_fin())
                .getResultList();
        return asignaciones;
    }
    public Object[] fechaInicioFinTodasAsignaciones(){
        query= "SELECT MIN(fecha_inicio),MAX(fecha_fin)\n" +
                "FROM asignacion";
        List<Object[]> fechaInicioFin = entityManager.createNativeQuery(query)
                .getResultList();
        return fechaInicioFin.get(0);
    }
    public List<Object[]> getAsistenciasPorRangoFechas(DtoFechas dtoFechas){
        query = "SELECT A.idAsistencia,CONCAT(E.nombre,' ',E.apellido,' ',E.apellido_materno),\n" +
                "\t\tDATE(A.fecha_hora),TIME(A.fecha_hora),A.tipo\n" +
                "FROM asistencia A\n" +
                "\tINNER JOIN empleado E ON A.idEmpleado=E.idEmpleado\n" +
                "WHERE A.fecha_hora >= :fechaIni AND A.fecha_hora <= :fechaFin";
        List<Object[]> asistencias = entityManager.createNativeQuery(query)
                .setParameter("fechaIni",dtoFechas.getFecha_inicio())
                .setParameter("fechaFin",dtoFechas.getFecha_fin())
                .getResultList();
        return asistencias;
    }
    public ResponseEntity<Resource> imprimirAsistenciasPorFechas(DtoFechas dtoFechas) {
        List<Object[]> asistencias = getAsistenciasPorRangoFechas(dtoFechas);
        HashMap<String, Object> parameters = new HashMap<>();
        List<Map<String, Object>> dataAsistencias = new ArrayList<>();
        DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        int cont=1;
        switch (dtoFechas.getOpcion()){
            case "Entrada":
                for(Object[] asistencia : asistencias){
                    int tipo = Integer.parseInt(asistencia[4]+"");
                    if(tipo==0){
                        LocalDate fecha = LocalDate.parse(asistencia[2]+"");
                        Map<String, Object> map = new HashMap<>();
                        map.put("nro", cont);
                        map.put("nombre", asistencia[1]);
                        map.put("fecha", fecha.format(formatoFecha));
                        map.put("hora", asistencia[3]+"");
                        map.put("tipo", "Entrada");
                        dataAsistencias.add(map);
                        cont++;
                    }
                }
                break;
            case  "Salida":
                for(Object[] asistencia : asistencias){
                    int tipo = Integer.parseInt(asistencia[4]+"");
                    if(tipo==1){
                        LocalDate fecha = LocalDate.parse(asistencia[2]+"");
                        Map<String, Object> map = new HashMap<>();
                        map.put("nro", cont);
                        map.put("nombre", asistencia[1]);
                        map.put("fecha", fecha.format(formatoFecha));
                        map.put("hora", asistencia[3]+"");
                        map.put("tipo", "Salida");
                        dataAsistencias.add(map);
                        cont++;
                    }
                }
                break;
            case "Ambos":
                for(Object[] asistencia : asistencias){
                    int tipo = Integer.parseInt(asistencia[4]+"");
                    LocalDate fecha = LocalDate.parse(asistencia[2]+"");
                    Map<String, Object> map = new HashMap<>();
                    map.put("nro", cont);
                    map.put("nombre", asistencia[1]);
                    map.put("fecha", fecha.format(formatoFecha));
                    map.put("hora", asistencia[3]+"");
                    map.put("tipo", (tipo==0)?"Entrada":"Salida");
                    dataAsistencias.add(map);
                    cont++;
                }
                break;
        }


        JRBeanCollectionDataSource dataSourceAsistencias = new JRBeanCollectionDataSource(dataAsistencias);
        parameters.put("dsTablaAsistencias", dataSourceAsistencias);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
        LocalDate inicio = dtoFechas.getFecha_inicio();
        LocalDate fin = dtoFechas.getFecha_fin();
        String fechaInicio = inicio.format(formatter);
        String fechaFin = fin.format(formatter);

        parameters.put("fechaInicio", fechaInicio);
        parameters.put("fechaFin", fechaFin);
        String nombreJasper = "reportesAsistencia";
        return getReporteEnPdf(parameters,nombreJasper);
    }

    public ResponseEntity<Resource> imprimirAsignacionesEmpleado(int id){
        List<Object[]> asignaciones = empleadoDaoImp.getAsignacionesEmpleado(id);
        Empleado empleado = entityManager.find(Empleado.class,id);
        String nombre = empleado.getNombre()+" "+empleado.getApellido()+" "+empleado.getApellido_materno();
        HashMap<String, Object> parameters = new HashMap<>();

        List<Map<String, Object>> dataAsignaciones = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d'/'MM'/'yyyy", new Locale("es", "ES"));
        LocalDate fechaI,fechaF;
        int cont=1;
        for (Object[] asignacion : asignaciones) {
            fechaI = LocalDate.parse(asignacion[3]+"");
            fechaF = LocalDate.parse(asignacion[4]+"");
            String fecha = fechaI.format(formatter)+" a "+fechaF.format(formatter);
            Map<String, Object> map = new HashMap<>();
            map.put("nro", cont);
            map.put("lugar", asignacion[1]);
            map.put("direccion", asignacion[2]);
            map.put("fecha", fecha);
            map.put("turno",asignacion[5]);
            dataAsignaciones.add(map);
            cont++;

        }
        JRBeanCollectionDataSource dataSourceAsignaciones = new JRBeanCollectionDataSource(dataAsignaciones);
        parameters.put("dsAsignacionesEmpleado", dataSourceAsignaciones);

        parameters.put("nombre", nombre);
        parameters.put("fechaactual", LocalDate.now().format(formatter));

        String archivo = "reporteAsignacionesEmpleado";
        return getReporteEnPdf(parameters,archivo);
    }

}

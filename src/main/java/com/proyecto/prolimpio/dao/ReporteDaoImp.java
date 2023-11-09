package com.proyecto.prolimpio.dao;

import com.proyecto.prolimpio.util.ConvertirDecimalATexto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
import java.util.*;

import static com.proyecto.prolimpio.util.ConvertirDecimalATexto.convertirNumero;


@Repository
@Transactional
public class ReporteDaoImp {
    @PersistenceContext
    EntityManager entityManager;
    String query = "";
    public ResponseEntity<Resource> getReporteGeneralEnPdf() {
        List<Object[]> asignaciones = reporteTodasLasAsignaciones();
        try {
            final File file = ResourceUtils.getFile("classpath:reportes/reporteGeneral.jasper");
            final File imgLogo = ResourceUtils.getFile("classpath:imagenes/logo.png");
            final JasperReport report = (JasperReport) JRLoader.loadObject(file);

            HashMap<String, Object> parameters = new HashMap<>();
            parameters.put("logo", new FileInputStream(imgLogo));

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

            SimpleDateFormat formato = new SimpleDateFormat("d 'de' MMMM 'del' yyyy", new Locale("es", "ES"));
            Date actual = new Date();
            String fecha = formato.format(actual);

            parameters.put("fechaActual", fecha);
            parameters.put("total",total);
            parameters.put("son",convertirNumero(total));

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
}

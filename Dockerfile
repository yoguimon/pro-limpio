# Usa una imagen base de Tomcat
FROM tomcat:9.0-jdk17-temurin

# Elimina la aplicación predeterminada ROOT de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copia tu archivo .war y lo despliega como la aplicación ROOT
COPY target/pro-limpio-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Expón el puerto en el que Tomcat escucha (8080)
EXPOSE 8080

# Configura el ENTRYPOINT para iniciar Tomcat
CMD ["catalina.sh", "run"]
# Usa una imagen base de Tomcat
FROM tomcat:9.0-jdk17

# Elimina la aplicación predeterminada de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copia tu archivo WAR al directorio webapps de Tomcat
COPY target/pro-limpio-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Expón el puerto 8080
EXPOSE 8080

# Inicia Tomcat
CMD ["catalina.sh", "run"]
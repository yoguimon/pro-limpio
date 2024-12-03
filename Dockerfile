# Usa una imagen base de Tomcat con soporte para JDK 17
FROM tomcat:9.0-jdk17

# Elimina la aplicación ROOT por defecto de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copia tu archivo WAR al directorio de aplicaciones web de Tomcat
COPY target/pro-limpio-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Expón el puerto que usará Tomcat
EXPOSE 8080

# Comando para iniciar Tomcat
CMD ["catalina.sh", "run"]
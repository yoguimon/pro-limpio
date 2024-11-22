# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Copia el archivo JAR del proyecto al contenedor
COPY target/pro-limpio-0.0.1-SNAPSHOT.war app.war

# Expón el puerto que usará tu aplicación
EXPOSE 8080

# Ejecuta el archivo JAR
ENTRYPOINT ["java", "-jar", "/app.war"]
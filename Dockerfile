FROM amazoncorretto:17-alpine-jdk

COPY target/pro-limpio-0.0.1-SNAPSHOT.war app.war

ENTRYPOINT ["java", "-jar", "/app.war"]
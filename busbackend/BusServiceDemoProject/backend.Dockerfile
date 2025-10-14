FROM openjdk:17-jdk-slim
WORKDIR /app
COPY mvnw .
COPY mvnw.cmd .
RUN chmod +x mvnw          # ← important
COPY pom.xml .
COPY .mvn .mvn
COPY src src
RUN ./mvnw clean package -DskipTests
EXPOSE 2015
CMD ["java","-jar","target/BusServiceDemoProject-0.0.1-SNAPSHOT.jar"]

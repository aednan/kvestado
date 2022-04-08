FROM openjdk:17-slim-buster
LABEL author="ADNAN.E@TUTANOTA.DE"
ADD ./kvestado.jar kvestado.jar
EXPOSE 80
ENTRYPOINT ["java","-jar","/kvestado.jar","--spring.profiles.active=prod"]
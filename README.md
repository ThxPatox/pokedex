<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<h1>Ejecutar en Desarrollo</h1>

1. Clonar el repo

2. Ejecutar
    ``` npm i ```
3. Tener Nest Cli Instalado
    ``` npm i @nestjs/cli ```
4. Levantar DB
    ``` docker-compose up -d ```



<h1>Stack Usado</h1>

* Mongo

* Nest



<h1>Iniciar Docker</h1>

* prod
    ``` docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build ```
<h3>build solo db</h3>

*solo db
    ``` docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d  ```

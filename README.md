<h3 align="center">Tecla Social Network</h3>

<p align="center">
    ¡Interactua con los miembros de tu equipo y amigos! Postulate a interesantes vacantes y encuentra el trabajo de tus sueños.
    <br />
    <a href="https://github.com/Sam-Hdez/ticket_2"><strong>Crea tu propia red social »</strong></a>
    <br />
  </p>
  <p>Autores:
    <br/>
    <a href="https://github.com/ELCapiPrice">Github Miguel</a>
    <br/>
    <a href="https://github.com/Roberto881">Github Roberto</a>
    <br/>
    <a href="https://github.com/Sam-Hdez">Github Samuel</a>
  </p>

<details open="open">
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#comenzar">Comenzar</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
  </ol>
</details>

## Acerca Del Proyecto

Implementación final de los conocimientos adquiridos durante el bootcamp de Tecla.

### Construido Con

Algunas de las tecnologias usadas
* [Bootstrap](https://getbootstrap.com)
* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com/)

## Comenzar

Es muy facil montar este proyecto localmente, solo hay que seguir los siguientes pasos:

### Prequisitos

* Tener instalado node v14.17.1 o posterior

Al clonar este repositorio y no olvides instalar las dependencias.
* npm
  ```sh
  npm install
  ```

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/Sam-Hdez/ticket_2.git
   ```
2. Instala los paquetes de NPM
   ```sh
   npm install
   ```
3. Crea tu archivo de variables de entorno `.env`
   ```JS
    HOST = localhost
    PORT = 3000
   
    DB_HOST = direccion_db
    DB_PORT = sql_server_predeterminado_1433
    DB_USR = username_db
    DB_PASS = clave_db
    DB_NAME = nombre_a_eleccion

    JWT_SEED = cadena_a_eleccion
    STRING_STRONG = cadena_a_eleccion

    LISTA_BLANCA = array_allowed_addresses
   ```

4. Inicializar el servidor: 
    ```sh
    npm run start
    ```
    Al inicializar el servidor se crearán o se verificará la existencia de las tablas. 

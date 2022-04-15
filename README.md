# Prueba técnica Banco Azteca - Utlizando React, Node.js, Express, Express-Validator, Sequelize, PostgreSQL

Antes de ejecutar el proyecto, hay que asegurarse de tener instalado Node.js y npm (Node Package Manager o Administrador de Paquetes de Node.js).

Puedes revisar la versión, abriendo la línea de comandos y ejecutando los comandos siguientes:

```node -v``` = Para revisar la versión de Node.js.

```npm -v``` = Para revisar la versión de npm.

En caso de no mostrar la versión o no mostrar nada, descargar Node.js  del siguiente enlace: https://nodejs.org/es/

Una vez verificada la versión o instalado Node.js hay que dirigirnos a la ruta donde descargamos el proyecto (<em>```Ejemplo: C:\Usuarios\NombreUsuario\Escritorio\examen```</em>), el proyecto se divide en 2 partes,
al llegar a la ruta de ejemplo se encontrarán con 2 directorios, en el cual en uno se almacena la parte del front-end (examen-app) y en el otro se almacena la parte del back-end o la REST API (examen-server),
se deben ingresar a cada una de las rutas (app y server) y ejecutar el comando ```npm i``` o ```npm install```, para que se descarguen e instalen todas las depencias necesarias para levantar el proyecto o se reconstruyan los módulos de node.

Continuando con la instalación de programas necesarios para hacer funcionar la REST API o back-end, es necesario tener el SGBD de PostgreSQL instalado (en las pruebas que se hicieron, se ejecutaron en las verisones 13 y 14 de PosgreSQL).

Si no se cuenta con PostgreSQL, se puede descargar del siguiente enlace: https://www.postgresql.org/download/

Después de tener el SGBD de PostgreSQL, se debe crear una base de datos con el nombre que se desee, por ejemplo: ```"grupo-salinas"```, la cuál más delante nos ayudará a conectarnos a la BD a través de la REST API.

Posteriormente, en la del donde se encuentra la REST API (<em>```Ejemplo: Ejemplo: C:\Usuarios\NombreUsuario\Escritorio\examen\examen-server```</em>), se debe crer un archivo llamado ```.env```, en el cual se configurarán las variables de entorno para poder levantar la REST API. Se puede tomar como copia el archivo llamado ```.env.example```, el cual contiene los nombres de las variables que se deben colocar en el archivo ```.env```, sólo que se les debe indicar un valor.

Dichos valores son los siguientes:

- PORT=5000
    - Es el puerto por el cual accederemos a la REST API, 5000 es un número de puerto, se puede asignar otro.
- DB_HOST=localhost
    - Es el servidor o la IP donde se aloja nuestra REST API, en este caso es local, se puede asignar otro.
- DB_USER=postgres
    - Es el usuario de base de datos mediante el cuál estaremos accediendo a la BD para tomar datos a través de la REST API, se puede asignar otro.
- DB_PASSWORD=postgres
    - Es la contraseña del usuario de base de datos mediante el cuál estaremos accediendo a la BD para tomar datos a través de la REST API, depende de qué usuario asignes.
- DB_PORT=5432
    - Es el puerto de la BD, por defecto PostgreSQL da ese puerto, pero se puede configurar, por ahí tendremos acceso a BD.
- DB_NAME=grupo-salinas
    - Es el njombre de la Bd con la que estará interectuando la REST API, en este caso, se dio el ejemplo de crear una CBD con el nombre de: ```"grupo-salinas"```


Para hacer la peticiones a la REST API se necesita un cliente REST, dejo alguno clientes REST para descargar:
- Potman: https://www.postman.com/downloads/
- Insomnia: https://insomnia.rest/download

Terminada la instalación de todas las dependencias o reconstrucción de módulos de node y programas necesarios, estando en el directorio donde se aloja el REST API (<em>```Ejemplo: C:\Usuarios\NombreUsuario\Escritorio\Evaluacion\examen\examen-server```</em>), basta con ejecutar el comando ```npm run dev``` (para levantar la REST API en modo de desarrollo) o ```node index.js``` (para levantar la REST API en modo de producción).

Se creará un servidor (dependiendo de lo que se ejecute) desplegando el proyecto, ahora estamos listos para empezar a consumir o hacer petciones al REST API mediante la herramienta o cliente REST (Post-Man, Insomnia, etc) de su preferencia.

Después de esto hay que configurar el archivo de variables de entorno para el lado del front-end (<em>```Ejemplo: Ejemplo: C:\Usuarios\NombreUsuario\Escritorio\examen\examen-app```</em>), se puede creas un archivo para ejecutar en modo de desarrollo, el cual se llamará ```.env.development``` (sugerido) o para producción se debe llamar ```.env.production```, en cada uno de estos archivos, debe de ir configurada la variable de entorno para hacer periciones o interactuar con el REST API, sólo se debe configurar un valor, el cual es el siguiente:

- REACT_APP_BACKEND_URL=REACT_APP_BACKEND_URL=http://localhost:5000/api/ 

Dicha variable apunta a la dirección donde se encuentra ejecutando el REST API. Después de esto sólo hay que ejecutar el comando  ```npm start``` (para levantar (crear una instancia de servidor) la app en modo de desarrollo) y estaremos listos para comenzar a usar el sistema.

__NOTA:__ 
La documentación de los endpoints de la REST API se encuentra en el siguiente enlace:
- https://documenter.getpostman.com/view/11843503/Uyr4LLKp

Hay 4 variables que se deben sustituir, la cuales son:
- {{host}} es el servidor donde se encuentra corriendo la REST API, en este caso es: ```localhost```
- {{port}} es el puerto por el cuál se le envíam las peticiones al REST API, en este caso es: ```5000```
- {{user_id}} el id del usuario que se genera en la primera petición o endpoint
- {{account_id}} el id de cuenta del usuario que se genera en la primera petición o endpoint

El código fuente de la prueba se encuentra en: 
- vfdblñ{ñf{kñn}}

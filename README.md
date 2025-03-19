# ClassConnect

## Tabla de Contenidos
- [Introducción](#introducción)
- [Desafíos del proyecto](#desafíos-del-proyecto)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Pre-requisitos](#pre-requisitos)
- [Testing](#testing)
- [Docker](#docker)
  - [Construcción de la imagen](#construcción-de-la-imagen)
  - [Correr el servicio](#correr-el-servicio)

## Introducción

Este proyecto consiste en el desarrollo de una API RESTful para gestionar cursos en la plataforma ClassConnect. La solución permite crear, obtener todos, obtener por ID y eliminar cursos.


## Desafíos del proyecto

* Uno de los principales desafíos fue configurar Docker, ya que fue la primera vez que lo armé desde cero. Costó entender bien para qué sirve cada parte y cómo levantar correctamente el servicio.
* Intenté agregar una base de datos, pero no logré que se iniciara correctamente. Probé varias cosas, pero no pude hacer que funcione bien junto con el resto del servicio.

## Decisiones de diseño

* Arme una estructura en layers, separando lo que es lógica de aplicación(app.js), manejo de datos(db.js), middlewares y el servicio. Esto ayuda a que el código sea más claro y fácil de escalar en caso de utilizarlo como base para el siguiente TP.

* Aunque ahora no estoy usando una base de datos real, armé un un wrapper para manejar los datos. La razon es que cuando implemente una base de datos como MongoDB o PostgreSQL, no tenga que modificar todo el código principal. Así solo cambio lo que está dentro de esa capa y el resto sigue funcionando igual.

## Pre-requisitos

Para levantar el entorno de desarrollo es necesario tener instalado:

- **Node.js** v22 LTS
- **npm** v10
- **Docker** v28

## Testing

Las pruebas automatizadas fueron desarrolladas utilizando [Jest](https://jestjs.io/docs/getting-started) y [Supertest](https://www.npmjs.com/package/supertest).


Para instalar las dependecias necesarias:
```bash
npm install
```
Para ejecutar las pruebas:
```bash
npm test
```
## Docker
### Construcción de la imagen

Desde la raíz del proyecto, ejecutar:

```bash
docker build --no-cache -t app-image:v1 .
docker run -p 8080:8080 app-image:v1
```

### Correr el servicio

El servicio se inicia junto con el contenedor generado. Verificar que el puerto esté correctamente expuesto (por defecto 8080).


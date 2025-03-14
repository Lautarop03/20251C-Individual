# ClassConnect

## Tabla de Contenidos
- [Introducción](#introducción)
- [Desafíos del proyecto](#desafíos-del-proyecto)
- [Pre-requisitos](#pre-requisitos)
- [Testing](#testing)
- [Docker](#docker)
  - [Construcción de la imagen](#construcción-de-la-imagen)
  - [Correr la base de datos](#correr-la-base-de-datos)
  - [Correr el servicio](#correr-el-servicio)

---

## Introducción

Este proyecto consiste en el desarrollo de una API RESTful para gestionar cursos en la plataforma ClassConnect. La solución permite crear, obtener todos, obtener por ID y eliminar cursos.

---

## Desafíos del proyecto

Parte de configurar docker ya que nunca lo habia armado desde 0 y la bdd

---

## Pre-requisitos

Para levantar el entorno de desarrollo es necesario tener instalado:

- **Node.js** v22.x LTS
- **npm** v10
- **Docker** v28
- **Base de datos**: ...

Variables de entorno necesarias:

PORT=8080 
ENVIRONMENT=development

## Testing

Las pruebas automatizadas fueron desarrolladas utilizando [Jest](https://jestjs.io/docs/getting-started) y [Supertest](https://www.npmjs.com/package/supertest).


## Docker
### Construcción de la imagen

Desde la raíz del proyecto, ejecutar:

```bash
docker build --no-cache -t app.js .
docker run -p 3000:3000 app.js:latest
```

### Correr la base de datos
### Correr el servicio
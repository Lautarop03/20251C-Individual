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

Uno de los principales desafíos fue configurar Docker, ya que fue la primera vez que lo armé desde cero. Costó entender bien para qué sirve cada parte, cómo levantar correctamente el servicio.

---

## Pre-requisitos

Para levantar el entorno de desarrollo es necesario tener instalado:

- **Node.js** v22 LTS
- **npm** v10
- **Docker** v28

## Testing

Las pruebas automatizadas fueron desarrolladas utilizando [Jest](https://jestjs.io/docs/getting-started) y [Supertest](https://www.npmjs.com/package/supertest).

Para ejecutarlas, simplemente correr:

```bash
npm start
```
## Docker
### Construcción de la imagen

Desde la raíz del proyecto, ejecutar:

```bash
docker build --no-cache -t app.js .
docker run -p 8080:8080 app.js:latest
```

### Correr el servicio

El servicio se inicia junto con el contenedor generado. Verificar que el puerto esté correctamente expuesto (por defecto 8080).


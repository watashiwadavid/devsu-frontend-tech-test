# App Prueba Técnica para devsu por David López

## Requisitos de Sistema

- **Node.js**: 20.13.1
- **npm**: 10.2.5
- **Angular**: 18.0.0

## Descripción del Proyecto

Esta aplicación está construida utilizando **Angular** .

- **Angular**: Es un framework de desarrollo de aplicaciones web que permite crear aplicaciones robustas y escalables. Angular ofrece herramientas poderosas para la construcción de interfaces de usuario dinámicas y de alto rendimiento.

### Estructura del Proyecto

#### ui: Capa de Presentación

Contiene las siguientes carpetas:

- **app**: Pagina app root del aplicativo
- **errors**: Paginas de control de excepciones.
- **layouts**: Contenedores generales de uso compartido
- **pages**: Páginas del aplicativo.
- **styles**: estilos generales de la libreria
- **src**: Archivos base y de configuración.

#### data: Capa de Datos

Contiene las siguientes carpetas:

- **api**: Generalidades de comunicacion con el api.
- **api/common**: Archivos comunes de consumo de api
- **api/config**: Archivos de configuración de la capa
- **api/modules**: Servicios y recursos por cada modulo del api

## Cómo Ejecutar

### Descargar el Repositorio

Clona el repositorio en tu máquina local.

### Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### Ejecutar Web

Ejecuta el siguiente comando para ejecutar la aplicación en un browser:

```bash
npx ng serve
```

abrir navegador en [http://localhost:4200/](http://localhost:4200/)

### Compilar

Ejecuta el siguiente comando para compilar la aplicación:

```bash
npx nd build  // compilar app angular
```

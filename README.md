# StockStores

### Live Demo: https://stockstores.onrender.com/
<br>

![stockstores](/frontend/public/images/stockstores.png)

## Ejecutar Localmente 

Para ejecutar este proyecto localmente en tu computador, siga los siguientes pasos:

### 1. Clonar Repositorio

```
$ git clone git@github.com:VinuSion/StockStores.git
$ cd StockStores
```

### 2. Crear archivo .env

- En la carpeta backend, crea un archivo ".env"

### 3. Setup MongoDB

- Para ejecutar localmente MongoDB
  - Instalar MongoDB Community Edition en este [sitio](https://www.mongodb.com/try/download/community)
  - En archivo .env escribir lo siguiente:
  ```
  MONGODB_URL=mongodb://localhost/stockstores
  ```

- Atlas Cloud MongoDB
  - Crear una BD en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - En archivo .env escribir lo siguiente:
  ```
  MONGODB_URL=mongodb+srv://tu-conexion-mongodb
  ```

### 4. Ejecutar Backend

Abre un nuevo terminal en VS Code en el directorio del proyecto y ejecuta:
```
$ cd backend
$ npm install
$ npm start
```

### 5. Ejecutar Frontend
Abre otro terminal en VS Code en el directorio del proyecto y ejecuta:
```
$ cd frontend
$ npm install
$ npm start
```

### 6. Crear Datos de Vendedor y Productos
Crear la cuenta del vendedor y 3 productos de ejemplo:
- Abre el siguiente enlace en el navegador: http://localhost:4000/api/seed

### 7. Vendedor Sign-in

Abre el siguiente enlace: http://localhost:3000/signin
- Digite el email y contraseña del usuario vendedor y clic a "Sign-In"

Listo, ya puedes usar la aplicacion localmente en tu computador!

## ¡MUCHAS GRACIAS!


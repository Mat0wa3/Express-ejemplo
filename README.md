# 🚀 Express.js Ejemplo - API Básica

[![Licencia](https://img.shields.io/badge/Licencia-MIT-green)](LICENSE)
[![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)](package.json)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org/)

---

## 📖 Descripción  
API REST sencilla creada con Express.js para demostrar conceptos básicos de rutas, middleware y manejo de errores. Ideal para principiantes que quieren aprender backend con Node.js.

---

## 🌟 Características  
✅ **Rutas básicas**:  
   - `GET /` - Página de inicio  
   - `GET /users` - Ruta para peticiones de usuario en la API
   - `GET /dates` - Ruta para peticiones de citas en la API

✅ **Middleware**:  
   - CORS configurado para seguridad  
   - Parseo automático de JSON y formularios  

✅ **Manejo de errores**:  
   - Middleware global para errores HTTP  

---

## 🛠️ Instalación  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/tu-usuario/express-ejemplo.git
2. Crea un archivo de configuración llamado `config.js`\
   ejemplo de config.js:
    ```javascript
    export const {
      PORT = 3000,
      SALT = 10,
      SECRET_KEY = 'this-is-my-first-secret-key-and-is-a-way-too-secure',
      DB_HOST = "localhost",
      DB_USER = "root",
      DB_PASSWORD = '',
      DB_NAME = "agendadb"
    } = process.env
    ```
3. Crear la base de datos, la que yo hice es mas o menos así:
   ```mysql
   DROP DATABASE IF EXISTS agendaDB;
   CREATE DATABASE agendaDB;
   USE agendaDB;

   CREATE TABLE roles(
      id_role INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(15),
      description TEXT
   );

   CREATE TABLE users(
      id_user binary(16) PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
      email VARCHAR(80) NOT NULL unique,
      pass VARCHAR(80) NOT NULL,
      id_role INT NOT NULL,
      
      FOREIGN KEY (id_role) REFERENCES roles(id_role)
   );

   CREATE TABLE dates(
      id_date binary(16) PRIMARY KEY,
      day DATE NOT NULL,
      time TIME NOT NULL,
      description TEXT,
      id_client binary(16) NOT NULL,
      id_employe binary(16) NOT NULL,
      
      FOREIGN KEY (id_client) REFERENCES users(id_user),
      FOREIGN KEY (id_employe) REFERENCES users(id_user)
   );

   INSERT INTO roles (name, description) VALUES
   ('Admin', 'Administrador del sistema'),
   ('Empleado', 'Persona encargada de gestionar citas'),
   ('Cliente', 'Usuario que solicita citas');

   -- SEED TABLE: USERS

   -- Admin user
   INSERT INTO users (id_user, name, last_name, email, id_role) VALUES
   (UUID_TO_BIN(UUID()), 'Juan', 'Perez', 'juan.perez@example.com', 1);

   -- Empleados
   INSERT INTO users (id_user, name, last_name, email, id_role) VALUES
   (UUID_TO_BIN(UUID()), 'Maria', 'Gomez', 'maria.gomez@example.com', 2),
   (UUID_TO_BIN(UUID()), 'Carlos', 'Lopez', 'carlos.lopez@example.com', 2);

   -- Clientes
   INSERT INTO users (id_user, name, last_name, email, id_role) VALUES
   (UUID_TO_BIN(UUID()), 'Ana', 'Martinez', 'ana.martinez@example.com', 3),
   (UUID_TO_BIN(UUID()), 'Luis', 'Rodriguez', 'luis.rodriguez@example.com', 3);
   ``` 
4. Inicia el servidor con el comando `node --run dev`
> [!NOTE]
> Si quieres contribuir lee el [CONTRIBUTE.md](CONTRIBUTE.md)

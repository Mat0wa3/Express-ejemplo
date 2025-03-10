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
   - `GET /api` - Ruta para probar la API

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
> [!NOTE]
> Si quieres contribuir lee el [CONTRIBUTE.md](CONTRIBUTE.md)

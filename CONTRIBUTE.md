# 🤝 Guía para contribuir a Express-Ejemplo

¡Gracias por tu interés en mejorar este proyecto! Sigue estas pautas para colaborar de forma efectiva.

---

## 📖 Reglas básicas
1. **Respeto**: Mantén un tono amable y constructivo en todos los comentarios.  
2. **Transparencia**: Documenta tus cambios claramente.  
3. **Consistencia**: Sigue los estándares de código existentes.  

---

## 🛠️ Configuración del entorno  
1. **Clona el repositorio**:  
    ```bash
    git clone https://github.com/Mat0wa3/Express-ejemplo.git
    cd Express-ejemplo
    ```

2. **Instala las dependencias**:
    ```bash
    pnpm install
    ```

3. **Crea tu archivo de config.js**:
    ```js
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

4. **Inicia el servidor**:
    ```bash
    node --run dev
    ```

---

## 🚀 Cómo contribuir
### 1. Reportar problemas
- **Bugs**:
  - Usa la etiqueta `bug` en GitHub.
  - Incluye:
    - Pasos para reproducir el error
    - Capturas de pantalla (si aplica)
    - Versión de Noje.js y navegador (si es relevante)
- **Nuevas ideas**:
  - Abre un issue con la etiqueta `enhancement`.
  - Explica el beneficio de tu propuesta.

### 2. **Enviar cambios (Pull Requests)
1. **Crea una rama**:
    ```bash
    git checkout -b nombre-de-tu-rama
    ```

2. **Haz tus cambios**:
   - Si añades código: incluye test.
   - Si modifica la lógica: actualiza la documentación.

3. **Sube los cambios**:
    ```bash
    git push origin nombre-de-tu-rama
    ```

4. **Abre tu PR en GitHub:
   - Describe tus cambios en detalle.
   - Menciona los issues relacionados (ej: `Resuelve #123`).

---

## 📏 Estilo de código
- **Formato**: Usa [Prettier](https://prettier.io/?spm=2b75ac3d.2ef5001f.0.0.3d4d5171K8a44n) para mantener la consistencia.
- **Nombres**:
  - Variables en inglés y descriptivas (`userProfile` en lugar de `datos`).
  - Funciones con verbos (ej: `calculateTotal()`).
- **Comentarios**: Explica el por qué , no el qué (el código debe ser autodescriptivo).

---

## 🙌 Reconocimientos
- Los contribuidores aparecerán en la sección `LICENSE` y en las notas de la versión.
- ¡Gracias por ayudar a mejorar este proyecto! 🚀

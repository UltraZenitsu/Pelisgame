# 🎬 Juego de Películas (PWA)

Juego de películas para jugar en equipos. Es HTML/CSS/JS puro: sin servidor, sin build, sin dependencias externas (las tipografías van incluidas). Funciona sin conexión después de la primera carga y se instala como app.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El juego completo (diseño y lógica) |
| `version.js` | **Única fuente de la versión** (`2.0.0`). Lo leen la página y el service worker |
| `sw.js` | Service worker: guarda el juego en caché y lo abre sin conexión |
| `manifest.webmanifest` | Nombre, colores, modo `standalone`, orientación vertical e iconos |
| `icons/` | Iconos 192 y 512 (normales y *maskable*), `apple-touch-icon` y favicon |
| `fonts/` | Lilita One y Nunito alojadas localmente |
| `favicon.ico`, `.nojekyll` | Favicon y ajuste para GitHub Pages |

## Publicar en GitHub Pages

1. Creá un repositorio público en GitHub (por ejemplo `juego-de-peliculas`).
2. Subí **el contenido de esta carpeta a la raíz del repo** (`index.html`, `sw.js`, `icons/`, `fonts/`, etc.; no la carpeta contenedora).
   - Desde la web: *Add file → Upload files* y arrastrá todo.
   - O con git: `git init && git add . && git commit -m "v2.0.0" && git branch -M main && git remote add origin <URL> && git push -u origin main`
3. En el repo: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, rama `main`, carpeta `/ (root)` → *Save*.
4. En 1 o 2 minutos queda en `https://TU-USUARIO.github.io/juego-de-peliculas/`.

Todas las rutas son relativas, así que funciona igual en un subdirectorio (`/repo/`) o en un dominio propio. GitHub Pages usa HTTPS, requisito para instalar una PWA.

## Instalar en Android

1. Abrí la URL en **Chrome**.
2. Tocá **📱 INSTALAR APP** en el menú del juego y aceptá el diálogo.
3. Si el botón muestra pasos manuales: menú **⋮** → **Instalar aplicación** (o **Agregar a pantalla de inicio**).

Queda con su propio ícono y se abre sin la barra del navegador, en vertical. En iPhone: Safari → Compartir ⬆️ → *Agregar a pantalla de inicio*.

## Publicar una actualización

1. Hacé los cambios que quieras en los archivos.
2. **Cambiá el número en `version.js`** (por ejemplo `2.0.1`). Es lo que hace que el service worker detecte la versión nueva.
3. Subí los cambios al repo (commit + push, o subir los archivos de nuevo).

Los jugadores reciben la actualización la próxima vez que abran la app con internet:

- Si están en el menú principal, se actualiza sola en un instante.
- Si están en otra pantalla, aparece el botón **🔄 NUEVA VERSIÓN — ACTUALIZAR** (nunca se interrumpe una partida).

Las partidas y la configuración se guardan en `localStorage` y **no se pierden** al actualizar.

Si agregás archivos nuevos al proyecto (otra imagen, otro `.js`), sumalos también a la lista `ASSETS` de `sw.js` para que funcionen sin conexión.

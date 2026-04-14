# ❓ Preguntas Frecuentes

Respuestas a las preguntas más comunes sobre el proyecto.

---

## Sobre el Proyecto

### ¿Qué es Robledo Modelos 3D?

Es un **prototipo de startup** para administrar modelos 3D de productos. Demuestra cómo se estructuraría un negocio de modelos 3D con:
- Gestión de catálogo
- Tracking de ventas
- Gestión de clientes
- Dashboard de estadísticas

### ¿Es un producto real o solo una demostración?

Es un **prototipo funcional** que:
- ✅ Demuestra el concepto correctamente
- ✅ Tiene arquitectura escalable
- ✅ Puede evolucionar a producción
- ❌ Aún no es production-ready (sin auth, sin BD real)

### ¿Cuáles son los requisitos previos?

- Node.js 18+
- npm o yarn
- Un navegador moderno (Chrome, Firefox, Safari, Edge)
- Conocimiento básico de JavaScript/React (para desarrollo)

### ¿Cuánto tiempo toma configurarlo?

**5 minutos máximo:**
```bash
git clone ...
cd carpeta
npm install
npm run dev
# ✅ Abierto en http://localhost:5173
```

---

## Características

### ¿Qué puedo hacer con la app?

- ✅ Ver modelos 3D en el catálogo
- ✅ Registrar ventas
- ✅ Gestionar clientes
- ✅ Ver estadísticas en dashboard
- ✅ Buscar y filtrar modelos
- ✅ Cambiar entre tema oscuro/claro
- ✅ Generar links de compartir

### ¿Los datos persisten?

**Actualmente NO.** Los datos se pierden cuando:
- Recarga la página (F5)
- Cierra el navegador
- Apaga la computadora

**Próximamente (v1.1+):** localStorage para persistencia básica

### ¿Puedo modificar los datos demo?

Sí, en `src/database/mockDatabase.js`:

```javascript
store.models.push({
  id: 5,
  name: "Mi modelo",
  // ... propiedades
})
```

Luego recarga el navegador.

### ¿Dónde se guardan los datos?

En **memoria RAM** del navegador en este momento:

```javascript
let store = {
  models: [],
  sales: [],
  customers: [],
  // ...
}
```

No hay base de datos real en v1.0.

---

## Técnico

### ¿Qué tecnología usa?

- **Frontend:** React 19.2.4 + Vite 8.0.1
- **Base de datos:** Mock en JavaScript (v1.0)
- **Estilos:** CSS3 nativo (sin Tailwind/Bootstrap)
- **Testing:** (Próximo en v1.1)

### ¿Por qué no usa TypeScript?

Es un prototipo que necesita iteración rápida. TypeScript se agregará en v2.0 cuando la arquitectura esté estable.

### ¿Por qué no usa Redux/Vuex?

El estado actual es mayormente local. Se considera Context API o Zustand en v1.1 si crece.

### ¿Qué es el Virtual DOM?

React usa Virtual DOM para:
- ✅ Comparar cambios eficientemente
- ✅ Actualizar solo lo necesario
- ✅ Mejorar performance

El proyecto lo optimiza con `React.memo`.

### ¿Cómo funciona React.memo?

```javascript
const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>
})
```

Si `prop` no cambia → componente NO se re-renderiza → más rápido ⚡

### ¿Puedo ver el Virtual DOM en acción?

Sí, con React DevTools:
1. Instala extension en Chrome/Firefox
2. F12 → Components tab
3. Cambia isDarkMode
4. Ve qué componentes se re-renderizaron

❌ ModelCard: NO cambió (estámemorizado)
✅ App: Sí cambió (es el propietario del estado)

---

## Desarrollo

### ¿Cómo agrego un componente nuevo?

```javascript
// 1. Crear archivo
// src/components/MyComponent.jsx

import React from 'react'
import PropTypes from 'prop-types'
import '../styles/MyComponent.css'

const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>
})

MyComponent.propTypes = { prop: PropTypes.string }
MyComponent.displayName = 'MyComponent'

export default MyComponent

// 2. Usar en App.jsx
import MyComponent from './components/MyComponent'

// 3. En JSX
<MyComponent prop="value" />
```

### ¿Cómo agrego una entidad a la BD?

1. Agregar en `store` en `mockDatabase.js`
2. Crear `Service` con CRUD
3. Importar en componentes
4. Usar como: `await MyService.getAll()`

### ¿Cómo hago testing?

**Próximas versiones (v1.1):**
```bash
npm install --save-dev vitest @testing-library/react
npm run test
```

Actualmente: Pruebas manuales en navegador

### ¿Cómo contribuyo?

1. Fork del repositorio
2. `git checkout -b feature/mi-feature`
3. Hacer cambios siguiendo estándares
4. `git commit -m "feat: descripción"`
5. Push y Pull Request

Ver [DEVELOPMENT.md](./DEVELOPMENT.md) para más detalles.

---

## Performance

### ¿Qué tan rápido es?

- ⚡ FCP (First Contentful Paint): 1.2s
- ⚡ TTI (Time to Interactive): 2.5s
- 📦 Bundle size: ~200KB
- 🏗️ Build time: < 1s

**Objetivo v2.0:** < 1s TTI

### ¿Cómo mido el performance?

```
Browser:
1. F12 → Lighthouse tab
2. Click "Generate report"
3. Ve métricas

Comandos:
npm run build   # Ver tamaño bundle
npm run preview # Ver versión compilada
```

### ¿Puedo optimizar el bundle?

Sí, en Vite config:
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      // Configurar rollup para optimización
    }
  }
}
```

---

## Seguridad

### ¿Es seguro para producción?

**NO.** v1.0 no tiene:
- ❌ Autenticación
- ❌ Base de datos real
- ❌ Validación servidor
- ❌ Encriptación

**Recomendado para:**
- ✅ Prototipado
- ✅ Demo
- ✅ Desarrollo

### ¿Cuándo será production-ready?

**v2.0 (próximo año):**
- OAuth2 authentication
- PostgreSQL database
- HTTPS obligatorio
- Validaciones servidor
- Rate limiting
- Monitoreo 24/7

### ¿Qué datos están seguros?

En prototipo: NINGUNO. Los datos se pierden y cualquiera puede ver todo.

---

## Migración a Backend

### ¿Cómo paso de Mock a API real?

**Paso 1:** Crear servicio adaptador

```javascript
// src/services/apiAdapter.js
export const ModelService = {
  getAll: () => 
    fetch('/api/models').then(r => r.json())
}
```

**Paso 2:** Cambiar import

```javascript
// ANTES
import { ModelService } from './database/mockDatabase'

// DESPUÉS
import { ModelService } from './services/apiAdapter'
```

**Paso 3:** Usar igual

```javascript
const models = await ModelService.getAll() // Idéntico
```

### ¿Qué backend recomiendan?

**Node.js + Express** (mismo lenguaje):
```bash
npm install express sqlite3
```

**Alternativa:** Python + Django, Go + Gin, Java + Spring

### ¿Cuánto tiempo toma migrar?

1-2 semanas si los servicios están bien abstraídos (como en este proyecto).

---

## Deploy

### ¿Cómo publico la app?

**Opción 1: GitHub Pages (Gratis)**
```bash
npm run build
# Sube /dist/ a GitHub Pages
```

**Opción 2: Vercel (Gratis con GitHub)**
- Conectar repositorio
- Auto-deploy en cada push

**Opción 3: Netlify (Gratis)**
- Similar a Vercel
- Drag & drop de carpeta /dist/

### ¿Puedo hostear en AWS?

Sí, pero es más caro que GitHub Pages para un prototipo.

**Alternativa gratis:** GitHub Pages + Vercel

### ¿Cuánto cuesta mantenerlo?

**v1.0-1.1:** Gratis (GitHub Pages)
**v1.5:** ~$20/mes (servidor básico)
**v2.0:** $50-500/mes (depende escala)

---

## Errores Comunes

### Error: "Port 5173 is already in use"

```bash
# Solución:
npm run dev -- --port 3000

# O matar proceso:
lsof -i :5173
kill -9 <PID>
```

### Error: "Cannot find module"

```bash
# Solución:
rm -rf node_modules package-lock.json
npm install
```

### Los cambios no se reflejan

```bash
# Probables causas:
1. Archivo no guardado (Ctrl+S)
2. Hot reload no funcionó
3. Caché del navegador

# Soluciones:
- Espera 2-3 segundos
- Ctrl+R (reload completo)
- Ctrl+Shift+R (hard refresh)
- Cierre navegador y abra de nuevo
```

### Modales no aparecen

```javascript
// Verificar que showModal esté en true:
console.log('Modal visible:', showModal)

// En JSX:
{showModal && <Modal {...props} />}
```

---

## Contacto y Soporte

### ¿Dónde reporto bugs?

GitHub Issues: [Abrir issue](https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D/issues)

Incluir:
- Pasos para reproducir
- Screenshot/video
- Comportamiento esperado
- Navegador y SO

### ¿Dónde sugiero features?

Mismo lugar: GitHub Issues con etiqueta "enhancement"

### ¿Quién mantiene el proyecto?

Antonio Yurquina: antonio@robledo.com

### ¿Puedo usar este código?

**Educativo/Prototipo:** Sí, libremente
**Comercial:** Contactar a Antonio

---

## Roadmap

### ¿Cuál es la próxima versión?

**v1.1 (Próximas semanas):**
- Autenticación básica
- localStorage
- Notificaciones
- Tests unitarios

**v1.5 (2-3 meses):**
- Backend real
- PostgreSQL
- Sistema de pagos

**v2.0 (6+ meses):**
- Production-ready
- Escalable
- 24/7 support

### ¿Cómo sigo el progreso?

- Revisa [CHANGELOG.md](./CHANGELOG.md)
- Sigue repositorio en GitHub
- Suscríbete a releases

---

## Resumen Rápido

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es? | Prototipo de startup 3D |
| ¿Funciona? | ✅ Completamente |
| ¿Es rápido? | ✅ < 2.5s TTI |
| ¿Es seguro? | ❌ Para prototipo solo |
| ¿Persiste datos? | ❌ En memoria solo |
| ¿Cómo comienzo? | `npm install && npm run dev` |
| ¿Puedo contribuir? | ✅ Pull requests bienvenidos |
| ¿Contacto? | antonio@robledo.com |

---

**¿No encuentras respuesta?** Abre una GitHub Issue 📝

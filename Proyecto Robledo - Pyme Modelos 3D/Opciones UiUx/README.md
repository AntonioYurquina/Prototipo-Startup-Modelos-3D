# 🚀 Prototipo Startup - Gestión de Modelos 3D para PYME

## 📋 Descripción General

**Robledo Modelos 3D** es una plataforma digital prototípica diseñada para pequeñas y medianas empresas (PYME) que trabajan con modelos 3D de productos. Esta solución demuestra mejores prácticas en el desarrollo de startups, incluyendo arquitectura escalable, base de datos simulada y componentes optimizados.

Este proyecto sirve como **prototipo funcional** antes de escalar a producción con tecnologías enterprise como bases de datos reales, servidores backend y APIs REST completas.

### 🎯 Objetivo
- ✅ Demostrar capacidad para gestionar modelos 3D
- ✅ Simular flujos de negocio reales (ventas, clientes)
- ✅ Implementar mejor prácticas de desarrollo
- ✅ Usar Virtual DOM para optimización de rendering
- ✅ Documentar arquitectura y decisiones técnicas

---

## 🌟 Características Principales

### ✨ Funcionalidades Implementadas

| Característica | Descripción | Estado |
|---|---|---|
| **Gestión de Modelos 3D** | Crear, editar, eliminar y visualizar modelos 3D | ✅ |
| **Sistema de Ventas** | Registro de pedidos y seguimiento de ventas | ✅ |
| **Base de Datos Simulada** | Mock database con operaciones CRUD completas | ✅ |
| **Gestión de Clientes** | Registro y seguimiento de clientes | ✅ |
| **Dashboard de Analytics** | KPIs y estadísticas de negocio | ✅ |
| **Modo Oscuro/Claro** | Interfaz adaptable a preferencias | ✅ |
| **Búsqueda y Filtros** | Búsqueda de modelos por categoría | ✅ |
| **Sistema de Categorías** | Clasificación de productos | ✅ |

---

## 🏗️ Arquitectura del Sistema

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                      APLICACIÓN WEB                          │
│              (React + Vite + Virtual DOM)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴──────────────┐
                │                            │
        ┌───────▼────────┐         ┌────────▼─────────┐
        │   COMPONENTES  │         │    STATE HOOKS   │
        │   OPTIMIZADOS  │         │  (useState, etc) │
        ├────────────┳───┤         └────────┬─────────┘
        │ •ModelCard │   │                  │
        │ •Dashboard │   │         ┌─────────▼────────────┐
        │ •FormField │   │         │  MOCK DATABASE       │
        └────────────┴───┘         │  (mockDatabase.js)   │
                                   └────────┬─────────────┘
                                            │
                    ┌───────┬────────┬──────┴──────┬─────────┐
                    │       │        │             │         │
            ┌───────▼─┐ ┌───▼───┐┌──▼──┐ ┌───────▼┐ ┌─────▼──┐
            │  Models │ │ Sales ││Cust │ │ Categ. │ │ Users  │
            │ Service │ │Service││omers │ │Service │ │Service │
            └─────────┘ └───────┘└─────┘ └────────┘ └────────┘
```

### Flujo de Datos

```
USER INTERACTION
       │
       ▼
    COMPONENT
       │
       ▼
   EVENT HANDLER
       │
       ▼
   UPDATE STATE (React Hooks)
       │
       ▼
   VIRTUAL DOM RECONCILIATION
       │
       ▼
   CALL SERVICE (MockDatabase)
       │
       ▼
   UPDATE STORE (In-Memory)
       │
       ▼
   RENDER OPTIMIZATION (React.memo)
       │
       ▼
   DISPLAY UPDATED UI
```

---

## 📊 Diccionario de Datos

### Tabla: `models` (Modelos 3D)

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | Integer (PK) | Identificador único | `1` |
| **name** | String | Nombre del modelo | `"Sillón Moderno"` |
| **description** | String | Descripción detallada | `"Sillón de diseño low-poly"` |
| **category** | String (FK) | Categoría del producto | `"muebles-sala"` |
| **fileName** | String | Nombre del archivo | `"sillon-moderno.glb"` |
| **fileFormat** | String | Formato del archivo | `"glb"`, `"obj"`, `"gltf"` |
| **fileSize** | Float | Tamaño en MB | `2.5` |
| **status** | Enum | Estado de publicación | `"published"`, `"draft"`, `"archived"` |
| **link** | String | URL de visualización | `"https://modelo.robledo.com/1"` |
| **thumbnailUrl** | String | URL de miniatura | `"/assets/thumbnails/model.jpg"` |
| **createdAt** | DateTime | Fecha de creación | `2024-02-15T10:30:00Z` |
| **updatedAt** | DateTime | Fecha de modificación | `2024-02-20T14:45:00Z` |
| **downloads** | Integer | Cantidad de descargas | `45` |
| **sales** | Integer | Cantidad de ventas | `12` |

### Tabla: `sales` (Ventas)

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | String (PK) | Código de venta | `"VENTA-001"` |
| **customerId** | Integer (FK) | ID del cliente | `1` |
| **modelId** | Integer (FK) | ID del modelo | `1` |
| **quantity** | Integer | Cantidad vendida | `5` |
| **unitPrice** | Float | Precio unitario | `350.00` |
| **totalPrice** | Float | Precio total | `1750.00` |
| **status** | Enum | Estado | `"pending"`, `"completed"`, `"cancelled"` |
| **date** | DateTime | Fecha de venta | `2024-02-15T10:30:00Z` |
| **notes** | String | Notas adicionales | `"Entrega en dos partes"` |

### Tabla: `customers` (Clientes)

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | Integer (PK) | Identificador único | `1` |
| **name** | String | Nombre completo | `"Juan Pérez García"` |
| **email** | String | Correo electrónico | `"juan@example.com"` |
| **phone** | String | Teléfono | `"+34 912 345 678"` |
| **company** | String | Empresa | `"Retail Solutions S.L."` |
| **city** | String | Ciudad | `"Madrid"` |
| **country** | String | País | `"España"` |
| **registeredAt** | DateTime | Fecha de registro | `2024-01-10T08:00:00Z` |
| **totalPurchases** | Integer | Total de compras | `5` |
| **totalSpent** | Float | Total gastado | `2500.00` |

### Tabla: `categories` (Categorías)

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | Integer (PK) | Identificador único | `1` |
| **name** | String | Nombre de categoría | `"Muebles de Sala"` |
| **slug** | String | URL friendly | `"muebles-sala"` |
| **icon** | String | Emoji representativo | `"🛋️"` |

### Tabla: `users` (Usuarios del Sistema)

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | Integer (PK) | Identificador único | `1` |
| **name** | String | Nombre completo | `"Admin User"` |
| **email** | String | Email | `"admin@robledo.com"` |
| **role** | Enum | Rol de usuario | `"admin"`, `"editor"`, `"viewer"` |
| **createdAt** | DateTime | Fecha de creación | `2024-01-01T00:00:00Z` |

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.4** - Framework UI con Virtual DOM
- **Vite 8.0.1** - Build tool moderno y rápido
- **CSS3** - Estilos con variables y gradientes
- **React Hooks** - State management simple

### Optimizaciones Virtual DOM
- ✅ `React.memo` para evitar re-renders
- ✅ `useMemo` para cálculos costosos
- ✅ Comparación personalizada en componentes
- ✅ Lazy loading en listas grandes

### Base de Datos (Prototipo)
- **mockDatabase.js** - Simulación en memoria
- Operaciones CRUD completas
- Servicios organizados por entidad

### Herramientas de Desarrollo
- **ESLint** - Linting y calidad de código
- **Vite Config** - Configuración optimizada

---

## 📁 Estructura del Proyecto

```
Opciones UiUx/
├── 📄 package.json                 # Dependencias y scripts
├── 📄 vite.config.js              # Configuración Vite
├── 📄 eslint.config.js            # Configuración ESLint
├── 📄 index.html                  # HTML principal
│
├── 📂 src/
│   ├── 📄 main.jsx                # Punto de entrada React
│   ├── 📄 App.jsx                 # Componente principal
│   │
│   ├── 📂 components/             # COMPONENTES REUTILIZABLES
│   │   ├── ModelCard.jsx          # Tarjeta de modelo (optimizado)
│   │   ├── Dashboard.jsx          # Panel de estadísticas
│   │   └── FormField.jsx          # Input genérico
│   │
│   ├── 📂 database/               # CAPA DE DATOS
│   │   └── mockDatabase.js        # Simulación de BD
│   │
│   ├── 📂 styles/                 # ESTILOS
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── ModelCard.css          # Estilos componente
│   │   ├── Dashboard.css          # Estilos dashboard
│   │   └── FormField.css          # Estilos form
│   │
│   └── 📂 assets/                 # RECURSOS
│       ├── icons.svg
│       └── favicon.svg
│
├── 📂 build/                       # BUILD OUTPUT (generado)
└── 📂 public/                      # ARCHIVOS ESTÁTICOS
```

---

## 🔌 API Services (Mock Database)

### ModelService

```javascript
// Obtener todos los modelos
await ModelService.getAll()
→ Promise<Model[]>

// Obtener por ID
await ModelService.getById(id)
→ Promise<Model | null>

// Crear modelo
await ModelService.create(modelData)
→ Promise<Model>

// Actualizar modelo
await ModelService.update(id, updates)
→ Promise<Model>

// Eliminar
await ModelService.delete(id)
→ Promise<boolean>

// Buscar
await ModelService.search(term)
→ Promise<Model[]>

// Filtrar por categoría
await ModelService.getByCategory(categorySlug)
→ Promise<Model[]>

// Obtener publicados
await ModelService.getPublished()
→ Promise<Model[]>
```

### SalesService

```javascript
await SalesService.getAll()           // Obtener todas las ventas
await SalesService.getById(id)        // Obtener por ID
await SalesService.create(saleData)  // Crear venta
await SalesService.update(id, updates) // Actualizar
await SalesService.getByCustomer(customerId) // Por cliente
await SalesService.getByModel(modelId)       // Por modelo
await SalesService.getStats()         // Estadísticas KPI
```

### CustomerService

```javascript
await CustomerService.getAll()        // Obtener todos
await CustomerService.getById(id)     // Por ID
await CustomerService.create(data)    // Crear cliente
await CustomerService.update(id, data) // Actualizar
await CustomerService.search(term)    // Buscar
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D.git

# 2. Navegar a la carpeta del proyecto
cd "Proyecto Robledo - Pyme Modelos 3D/Opciones UiUx"

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev       # Ejecutar en desarrollo con hot reload
npm run build     # Compilar para producción
npm run preview   # Vista previa de build
npm run lint      # Verificar calidad de código
```

### Compilar para Producción

```bash
npm run build
# Genera carpeta /dist/ lista para deploy
```

---

## 🎨 Características de UI/UX

### 🌓 Tema Oscuro/Claro
- Toggle en la interfaz
- Persistencia automática
- Transiciones suaves

### 📱 Responsive Design
- Breakpoints: Mobile, Tablet, Desktop
- Grid layouts adaptativos
- Texto escalable

### ♿ Accesibilidad
- Etiquetas semánticas HTML5
- ARIA labels en componentes
- Contraste de colores WCAG AA
- Navegación por teclado

### ⚡ Rendimiento
- Virtual DOM optimization con React.memo
- Code splitting con Vite
- Lazy loading de componentes
- Minificación automática en build

---

## 🔄 Roadmap - Próximas Versiones

### v1.1 (Próximas semanas)
- [ ] Autenticación básica (JWT)
- [ ] Exportación de reportes (PDF)
- [ ] Notificaciones en tiempo real
- [ ] Carrito de compras mejorado

### v1.5 (Desarrollo intermediario)
- [ ] API REST backend (Node.js + Express)
- [ ] Base de datos real (PostgreSQL)
- [ ] Autenticación OAuth2
- [ ] Sistema de pagos (Stripe/PayPal)

### v2.0 (Producción)
- [ ] Servidor production-grade
- [ ] SSL/TLS
- [ ] CDN para assets
- [ ] Sistema de logs completo
- [ ] Monitoreo y analytics

### v2.5 (Escala)
- [ ] Microservicios
- [ ] WebSockets para tiempo real
- [ ] App mobile (React Native)
- [ ] Administración avanzada

---

## 💡 Decisiones de Arquitectura

### ✅ Por qué Mock Database?
- 📚 **Educacional**: Demuestra patrones CRUD sin complejidad de DB real
- 🚀 **Rápido**: Prototipado ágil sin configuración de infraestructura
- 🔄 **Migración fácil**: Refactoring simple a API real

### ✅ Por qué React.memo?
- ⚡ **Rendimiento**: Evita re-renders innecesarios
- 💾 **Memoria**: Reduce replicaciones de estado
- 🎯 **Precisión**: Control granular de actualizaciones

### ✅ Por qué Vite?
- ⚡ **Velocidad**: Build 10x más rápido que Webpack
- 🔥 **HMR**: Hot Module Replacement instantáneo
- 📦 **Bundle pequeño**: Output optimizado

---

## 🧪 Testing (Próximamente)

```bash
# Instalación
npm install --save-dev vitest @testing-library/react

# Ejecutar tests
npm run test

# Coverage
npm run test:coverage
```

---

## 📝 Convenciones de Código

### Componentes
```javascript
// ✅ Correcto
import React from 'react'
const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>
})
MyComponent.displayName = 'MyComponent'
export default MyComponent

// ❌ Evitar
const MyComponent = (props) => {
  return <div>{props.prop}</div>
}
```

### Estado
```javascript
// ✅ Correcto - Hooks
const [state, setState] = useState(initialValue)

// ❌ Evitar - Class Components (en nuevo código)
class MyComponent extends React.Component { }
```

---

## 🤝 Contribuir

Este es un proyecto demostrativo. Para sugerencias:

1. Abrir issue en GitHub
2. Describir propuesta
3. Esperar feedback

---

## 📄 Licencia

Este proyecto es de ejemplo educativo. Contactar a: **antonio@robledo.com**

---

## 📞 Contacto y Soporte

**Robledo Modelos 3D**
- 🌐 Sitio: https://robledo.com
- 📧 Email: info@robledo.com
- 💼 LinkedIn: [Antonio Yurquina](#)
- 🐙 GitHub: [AntonioYurquina](https://github.com/AntonioYurquina)

---

## 🔖 Changelog

### v1.0.0 (Versión Prototipo)
- ✅ Gestión de modelos 3D
- ✅ Sistema de ventas
- ✅ Base de datos simulada
- ✅ Dashboard de estadísticas
- ✅ Componentes optimizados con React.memo
- ✅ Documentación completa

---

## 📌 Notas Importantes

Este es un **prototipo funcional** diseñado para:
- ✨ Demostración de capacidades técnicas
- 📚 Base para desarrollo futuro
- 🎯 Validación de concepto

**No está recomendado para producción sin:**
- Implementación de autenticación real
- Base de datos persistente
- Validaciones avanzadas
- Sistema de pagos integrado
- Infraestructura de seguridad

---

**Última actualización**: Abril 2026
**Versión**: 1.0.0 - Prototipo
**Estado**: Activo ✅

## 📋 Prerequisitos

- Node.js 16+ 
- npm o yarn

## 🛠️ Instalación

```bash
npm install
```

## 💻 Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

## 🔨 Build

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `build/`

## 👁️ Preview

```bash
npm run preview
```

## 🚀 Deploy en GitHub Pages

Este proyecto está configurado para deployar automáticamente en GitHub Pages.

### Opción 1: Deploy Automático con GitHub Actions

1. Sube tu código a GitHub
2. Ve a **Settings** > **Pages**
3. En "Build and deployment", selecciona:
   - Source: **GitHub Actions**
4. El workflow se ejecutará automáticamente en cada push a `main`

### Opción 2: Deploy Manual

```bash
npm run build
# Los archivos están listos en la carpeta 'build/'
```

Sube la carpeta `build/` a tu servidor o GitHub Pages.

## 📝 Configuración

- **Vite Config**: `vite.config.js`
- **ESLint Config**: `eslint.config.js`
- **Dependencias**: `package.json`

## 🔗 Enlaces útiles

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

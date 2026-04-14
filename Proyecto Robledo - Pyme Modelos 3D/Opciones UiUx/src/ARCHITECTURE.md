# 🏭 Robledo PYME - Hub Modelos 3D v1.1.0

## Arquitectura Modular Refactorizada

La aplicación ha sido completamente modularizada para mejorar escalabilidad y mantenibilidad.

### 📁 Estructura de Carpetas

```
src/
├── App.jsx                 # Contenedor principal (router)
├── App.css                 # Estilos globales
├── main.jsx              # Punto de entrada
│
├── pages/                  # Páginas principales
│   ├── DashboardPage.jsx           # Vista de métricas y KPIs
│   ├── ModelsPage.jsx              # Gestión de modelos con filtrado
│   ├── SalesPage.jsx               # Registro y análisis de ventas
│   └── (Carpeta CSS en styles/)
│
├── features/               # Módulos de características
│   ├── LinkGenerator.jsx           # Componente generador de links
│   ├── LinkGenerator.css           # Estilos del generador
│   └── (Otros módulos futuros)
│
├── lib/                    # Lógica de negocio pura (sin React)
│   ├── linkGenerator.js            # Funciones temporales de links
│   └── linkStorage.js              # Gestión de localStorage
│
├── components/             # Componentes reutilizables
│   ├── ModelCard.jsx
│   ├── Dashboard.jsx
│   ├── FormField.jsx
│   └── ...
│
├── database/               # Servicios de datos
│   └── mockDatabase.js              # 5 servicios (CRUD)
│
├── hooks/                  # Custom React Hooks
│   └── useCustomHooks.js            # 8 hooks personalizados
│
├── utils/                  # Utilidades y helpers
│   └── helpers.js                   # 20+ funciones de utilidad
│
├── styles/                 # CSS de páginas
│   ├── DashboardPage.css
│   ├── ModelsPage.css
│   └── SalesPage.css
│
└── assets/                 # Recursos estáticos
    └── ...
```

### 🎯 Componentes Principales

#### **App.jsx** - Router/Contenedor
- Gestiona navegación entre páginas
- Sincroniza tema (dark/light) con localStorage
- Mantiene estado global: modelos, ventas, clientes

```javascript
// Uso:
<App /> // Renderiza sidebar + página actual
```

#### **pages/DashboardPage.jsx** - Métricas
- KPIs de ingresos, ventas, clientes
- Filtrado por período (semana/mes/trimestre/año)
- Modelos más vendidos y tendencias

**Props:**
```javascript
{
  models: Object[],      // Todos los modelos
  sales: Object[],       // Todas las ventas
  customers: Object[],   // Todos los clientes
  isDarkMode: Boolean    // Tema actual
}
```

#### **pages/ModelsPage.jsx** - Gestión de Modelos
- Búsqueda en tiempo real
- Filtros por estado (all/published/draft/archived)
- Grid responsive de ModelCards

**Props:**
```javascript
{
  models: Object[],
  isDarkMode: Boolean,
  onSelectModel: Function(modelId),
  onDeleteModel: Function(modelId)
}
```

#### **pages/SalesPage.jsx** - Registro de Ventas
- Tabla interactiva de ventas
- Estadísticas (total, completadas, pendientes)
- Filtrado y ordenamiento avanzado

**Props:**
```javascript
{
  sales: Object[],
  customers: Object[],
  models: Object[],
  isDarkMode: Boolean
}
```

#### **features/LinkGenerator.jsx** - Generador de Links
- Crea links temporales con expiración (1h-48h)
- Copia a portapapeles
- Muestra contador de descargas

**Props:**
```javascript
{
  model: Object,                    // Modelo seleccionado
  isDarkMode: Boolean,
  onSelectModel: Function,
  models: Object[]                  // Para cambiar modelo
}
```

### 🔧 Lógica de Negocio (lib/)

#### **lib/linkGenerator.js**
```javascript
// Crear link temporal
const link = generateTemporaryLink(modelId, 24)
// { id, modelId, token, link, expiresAt, isExpired, downloadCount }

// Verificar si expiró
isLinkExpired(linkData) // Boolean

// Obtener tiempo restante
getTimeRemaining(linkData) // "12h 30m" | "Expirado"
```

#### **lib/linkStorage.js**
```javascript
// Persistencia en localStorage
saveLinkToStorage(linkData)
getAllLinks()
getLinksByModel(modelId)
getLatestValidLink(modelId)
incrementDownloadCount(linkId)
cleanupExpiredLinks() // retorna count de eliminados
```

### 💾 Servicios de Datos (database/)

Cada servicio proporciona **CRUD completo**:

```javascript
// ModelService
ModelService.create(data)
ModelService.getAll()
ModelService.getById(id)
ModelService.update(id, data)
ModelService.delete(id)

// SalesService - 27 métodos
SalesService.getAllBySalesPeriod(startDate, endDate)
SalesService.getByCustomerId(customerId)

// CustomerService
CustomerService.getWithTotalSpent()

// CategoryService
CategoryService.getWithModelCount()

// UserService
UserService.getByRole(role)
```

### 🎨 Sistema de Temas

**Dark/Light Mode** con CSS Variables:
```css
:root {
  --bg-dark: #0f172a;
  --bg-light: #f9fafb;
  --text-dark: #f3f4f6;
  --text-light: #1f2937;
  --color-primary: #3b82f6;
}
```

Sincronizado con localStorage:
```javascript
const isDarkMode = localStorage.getItem('isDarkMode')
```

### 📊 Flujo de Datos Sprint 2

```
[Usuario] 
  ↓
[App.jsx - Router]
  ├─→ [DashboardPage] ← data: ModelService, SalesService
  ├─→ [ModelsPage] 
  │   └─→ [ModelCard] ← onSelectModel
  ├─→ [SalesPage] ← data: SalesService + relationships
  └─→ [LinkGenerator] ← lib/linkGenerator.js
      └─→ localStorage ← lib/linkStorage.js
```

### 🚀 Cómo Usar

**1. Navegar a una página:**
```javascript
// En App.jsx
const [currentPage, setCurrentPage] = useState('dashboard')
```

**2. Seleccionar modelo y generar link:**
```javascript
const handleSelectModel = (modelId) => {
  setSelectedModel(modelId)
  setCurrentPage('link-generator')
}
```

**3. Con localStorage automático:**
```javascript
// LinkGenerator guarda automaticamente en localStorage
// con expiraciones y contador de descargas
```

### 📈 Próximos Pasos (v1.2)

- [ ] Cargar modelos 3D (file upload)
- [ ] Vista previa de modelos en viewer
- [ ] Notificaciones en tiempo real
- [ ] Exportar reportes (PDF/Excel)
- [ ] Autenticación de usuarios
- [ ] API REST integration

### 🔗 Dependencias Sprint 2 Implementadas

✅ **Generador de links** (temporal, con expiración)
✅ **Dashboard filtrado** (por período)
⏳ **Carga de modelos** (próxima)
⏳ **Visualización de métricas** (en dashboard)

---

**Versión:** 1.1.0  
**Última actualización:** 2024  
**Estructura:** Feature-based modular architecture

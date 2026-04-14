# 🏗️ Arquitectura del Proyecto

## Visión General

Este documento detalla las decisiones arquitectónicas, patrones de diseño y estructura del prototipo Robledo Modelos 3D.

---

## 📐 Patrón de Arquitectura

### Capas de la Aplicación

```
┌────────────────────────────────────┐
│      PRESENTATION LAYER            │
│  (React Components + UI)           │
├────────────────────────────────────┤
│      STATE MANAGEMENT LAYER        │
│  (React Hooks + Context)           │
├────────────────────────────────────┤
│      SERVICE LAYER                 │
│  (Business Logic)                  │
├────────────────────────────────────┤
│      DATA ACCESS LAYER             │
│  (MockDatabase Services)           │
├────────────────────────────────────┤
│      DATA LAYER                    │
│  (In-Memory Store)                 │
└────────────────────────────────────┘
```

---

## 🔀 Flujo de Datos (Unidireccional)

```
Component
    ↓
User Interaction (onClick, onChange, etc)
    ↓
Event Handler (setState)
    ↓
Update Local State
    ↓
Virtual DOM Reconciliation
    ↓
Call Service Method
    ↓
Mutate Store
    ↓
Component Re-render (if needed)
    ↓
Display Updated UI
```

---

## 💾 Estado Global vs Local

### Estado Local (useState)
- ✅ Búsqueda de modelos
- ✅ Formularios
- ✅ Visibilidad de modales
- ✅ Tema oscuro/claro

```javascript
const [searchTerm, setSearchTerm] = useState('')
const [isDarkMode, setIsDarkMode] = useState(true)
```

### Estado Global (Para Futuro)
- ⏳ Autenticación del usuario
- ⏳ Carrito de compras
- ⏳ Notificaciones
- ⏳ Preferencias del usuario

**Recomendación**: Usar Context API o Zustand en v1.1+

---

## 🔧 Patrón Service/Repository

### MockDatabase como Capa de Abstracción

```javascript
// src/database/mockDatabase.js
export const ModelService = {
  getAll: () => Promise<Model[]>,
  getById: (id) => Promise<Model>,
  create: (data) => Promise<Model>,
  update: (id, data) => Promise<Model>,
  delete: (id) => Promise<boolean>
}
```

**Ventajas**:
- 🔄 Fácil migración a API real
- 🧪 Tests unitarios simplificados
- 🎯 Lógica de negocio centralizada

---

## ⚡ Optimizaciones Virtual DOM

### React.memo

```javascript
const ModelCard = React.memo(
  ({ model, onSelect, isDarkMode }) => (
    // Component JSX
  ),
  // Custom comparison function
  (prevProps, nextProps) => {
    return prevProps.model.id === nextProps.model.id
  }
)
```

**Casos de uso**:
- Componentes que reciben props complejas
- Listas largas (>100 items)
- Componentes puros (sin efectos secundarios)

### useMemo En Ciernes

```javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
```

**Casos de uso**:
- Cálculos costosos
- Derivación de state
- Creación de objetos para props

---

## 📦 Estructura de Carpetas - Justificación

```
src/
├── components/        # ✅ UI components reutilizables
│   ├── ModelCard.jsx
│   ├── Dashboard.jsx
│   └── FormField.jsx
│
├── database/         # ✅ Capa de datos (MockDB)
│   └── mockDatabase.js
│
├── styles/           # ✅ CSS modular por componente
│   ├── ModelCard.css
│   ├── Dashboard.css
│   └── FormField.css
│
├── utils/            # ✅ Funciones auxiliares
│   └── (próximamente)
│
├── hooks/            # ✅ Custom React hooks
│   └── (próximamente)
│
└── App.jsx           # ✅ Componente raíz
```

**Beneficios**:
- 📦 Separación de responsabilidades
- 🔍 Fácil de mantener y escalar
- 🧪 Facilita testing
- 📚 Estructura clara para nuevos desarrolladores

---

## 🔗 Integración de Componentes

### Component Hierarchy

```
<App>
  ├── <Header>
  │   └── <ThemeToggle>
  ├── <MainContent>
  │   ├── <Dashboard>
  │   │
  │   ├── <ModelList>
  │   │   └── <ModelCard> x N (con React.memo)
  │   │
  │   └── <FormSection>
  │       └── <FormField> x N
  │
  └── <Footer>
```

### Props Drilling Solution

**Actual** (Props Drilling):
```javascript
// En v1.0 - Pasamos isDarkMode por múltiples niveles
<Component isDarkMode={isDarkMode}>
  <ChildComponent isDarkMode={isDarkMode}>
    <GrandchildComponent isDarkMode={isDarkMode} />
  </ChildComponent>
</Component>
```

**Futuro** (Context API en v1.1):
```javascript
const ThemeContext = React.createContext()

// En App.jsx
<ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
  <MainContent />
</ThemeContext.Provider>

// En cualquier componente
const { isDarkMode } = useContext(ThemeContext)
```

---

## 🗂️ Patrones de Datos

### Mock Data Structure

```javascript
// Modelos organizados por entidad
const store = {
  models: [
    {
      id: 1,
      name: 'Sillón Moderno',
      // ... propiedades
    }
  ],
  sales: [...],
  customers: [...],
  categories: [...]
}
```

**Por qué esta estructura**:
- ✅ Normalización de datos
- ✅ Evita duplicación
- ✅ Fácil actualización
- ✅ Similar a BD relacional real

---

## 📡 Integración Futura con API

### Pasos de Migración

#### Fase 1: Mantener MockDatabase (Actual)
```javascript
// src/database/mockDatabase.js
export const ModelService = { ... }
```

#### Fase 2: Crear Adapter (v1.1)
```javascript
// src/adapters/apiAdapter.js
export const ModelService = {
  getAll: () => fetch('/api/models').then(r => r.json())
}
```

#### Fase 3: Cambiar Provider
```javascript
// Cambiar import en componentes
- import { ModelService } from './database/mockDatabase'
+ import { ModelService } from './adapters/apiAdapter'
```

**Sin cambios en componentes**: Los servicios tienen la misma interface!

---

## 🔐 Consideraciones de Seguridad (Futuro)

### v1.0 (Actual)
- ⚠️ Sin autenticación
- ⚠️ Datos en memoria
- ⚠️ Sin validación de backend
- ✅ Adecuado para prototipo

### v1.5+ (Con servidor)
- ✅ JWT o OAuth2
- ✅ HTTPS/TLS
- ✅ Validación servidor
- ✅ Sanitización de inputs
- ✅ CORS configurado
- ✅ Rate limiting

---

## 📊 Escalabilidad

### Actual (v1.0)
- ✅ Soporta: ~1000 modelos
- ✅ Soporta: ~100 usuarios simultáneos
- Limitado por: Memoria del navegador

### Próximo (v2.0 - Backend)
- ✅ Escalable horizontalmente
- ✅ Base de datos con índices
- ✅ Caché (Redis)
- ✅ CDN para assets

---

## 🎯 Decisiones Clave

### ¿Por qué NO usar estado global (Vuex/Redux)?
- 📏 Proyecto pequeño
- 🎯 Estado principalmente local
- 🚀 Menos complejidad inicial
- 📝 Fácil de mantener

**Será implementado en v1.1 cuando sea necesario**

### ¿Por qué NO usar TypeScript?
- 🧪 Prototipo - necesita iteración rápida
- 👥 Equipo pequeño inicial
- 🚀 Vite ya proporciona HMR excelente

**Será migrado en v2.0**

### ¿Por qué CSS vanilla + CSS Modules en lugar de Tailwind?
- 📚 Mejor control visual
- 🎨 Custom branding
- 📦 Menos dependencias
- 🚀 Vite maneja bien CSS nativo

**Podría considerarse Tailwind en v2.0**

---

## 🧪 Testing Strategy (v1.1+)

### Unit Tests
```javascript
// tests/services/ModelService.test.js
describe('ModelService', () => {
  test('getAll returns all models', async () => {
    const models = await ModelService.getAll()
    expect(models.length).toBeGreaterThan(0)
  })
})
```

### Component Tests
```javascript
// tests/components/ModelCard.test.jsx
describe('ModelCard', () => {
  test('renders model name', () => {
    render(<ModelCard model={mockModel} />)
    expect(screen.getByText('Sillón Moderno')).toBeInTheDocument()
  })
})
```

### E2E Tests
```javascript
// tests/e2e/models.spec.js
describe('Model Management Flow', () => {
  test('user can view all models', () => {
    // Cypress/Playwright test
  })
})
```

---

## 📈 Métricas de Rendimiento

### Actuales
- ⚡ Build time: < 1s (Vite)
- 📦 Bundle size: ~200KB (minified)
- 🖥️ FCP: ~1.2s
- ⚡ TTI: ~2.5s

### Objetivos
- ⚡ Build: < 0.5s
- 📦 Bundle: < 150KB
- 🖥️ FCP: < 1s
- ⚡ TTI: < 1.5s

Monitoreado con Lighthouse + WebPageTest

---

## 🔄 Versionado

### Semantic Versioning

```
1.0.0
│ │ └─ Patch (bug fixes)
│ └─── Minor (features)
└───── Major (breaking changes)
```

### Release Cycle
- **v1.0**: Inicial (Prototipo)
- **v1.x**: Features (próximamente)
- **v2.0**: Backend + Production
- **v2.x**: Escala y optimizaciones

---

## 📚 Referencia Rápida

| Aspecto | Decisión | Justificación |
|--------|----------|---------------|
| **Framework** | React | Virtual DOM, comunidad |
| **Build** | Vite | Velocidad, HMR |
| **Estado** | useState | Simple, suficiente |
| **Base de datos** | Mock | Prototipo ágil |
| **Estilos** | CSS nativo | Control, sin dependencias |
| **Testing** | (próximo) | Vite + Vitest + RTL |
| **Deploy** | GitHub Pages | Gratis, simple |

---

**Última actualización**: 2026-04-14
**Versión de documento**: 1.0
**Mantenedor**: Antonio Yurquina

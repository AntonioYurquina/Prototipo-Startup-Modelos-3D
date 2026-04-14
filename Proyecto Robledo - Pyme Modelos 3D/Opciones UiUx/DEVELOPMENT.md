# 📚 Guía de Desarrollo

## Cómo Contribuir al Proyecto

Este documento proporciona directrices para desarrolladores que deseen trabajar en el prototipo.

---

## 🔧 Setup para Desarrollo

### 1. Clonar y Configurar

```bash
# Clonar desde GitHub
git clone https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D.git

# Navegar a carpeta
cd "Proyecto Robledo - Pyme Modelos 3D/Opciones UiUx"

# Instalar dependencias
npm install

# Verificar instalación
npm run dev
```

### 2. Estructura IDE (VS Code)

**Extensiones recomendadas:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (para testing de APIs)

**Configuración .vscode/settings.json:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact"]
}
```

---

## 📝 Estándares de Código

### Convención de Nombres

```javascript
// ✅ Componentes - PascalCase
const MyComponent = () => {}

// ✅ Funciones - camelCase
const handleClick = () => {}
const getUserData = () => {}

// ✅ Constantes - UPPER_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRIES = 3

// ✅ Archivos
// Componentes: MyComponent.jsx
// Hooks: useCustomHook.js
// Utils: helpers.js
// Estilos: MyComponent.css
```

### Formato de Código

```javascript
// ✅ Correcto
const handleSubmit = (e) => {
  e.preventDefault()
  
  const { name, email } = values
  
  if (!validateEmail(email)) {
    setError('Email inválido')
    return
  }
  
  submitForm(values)
}

// ❌ Evitar
const handlesubmit=(e)=>{e.preventDefault();const {name,email}=values;if(!validateEmail(email)){setError('Email inválido');return;}submitForm(values);}
```

### JSX Style

```javascript
// ✅ Múltiples props en línea si caben
return <Component prop1="value" prop2="value" />

// ✅ Props en separado si son muchos
return (
  <Component
    prop1="value"
    prop2="value"
    prop3="value"
    onEvent={handleEvent}
  />
)

// ✅ Contenido anidado
return (
  <Container>
    <Header title="My Title" />
    <Content>
      <Item key={item.id} {...item} />
    </Content>
  </Container>
)
```

---

## 🎯 Crear un Componente

### Estructura Básica

```javascript
// src/components/MyNewComponent.jsx

import React from 'react'
import PropTypes from 'prop-types'
import '../styles/MyNewComponent.css'

/**
 * My New Component
 * Descripción breve de qué hace
 */
const MyNewComponent = React.memo(({
  prop1,
  prop2,
  onEvent
}) => {
  return (
    <div className="my-component">
      {prop1}
    </div>
  )
})

MyNewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onEvent: PropTypes.func
}

MyNewComponent.displayName = 'MyNewComponent'

export default MyNewComponent
```

### Checklist

- [ ] Componente con `React.memo`
- [ ] PropTypes documentados
- [ ] displayName asignado
- [ ] Estilos en archivo separado
- [ ] Comentarios JSDoc
- [ ] Nombre descriptivo
- [ ] Props bien organizados

---

## 📊 Agregar una Entidad a la BD Simulada

### 1. Actualizar mockDatabase.js

```javascript
// En store
let store = {
  // ... otras entidades
  newEntity: []
}

// En inicialización
store.newEntity = [
  {
    id: 1,
    name: 'Example',
    // ... propiedades
  }
]
```

### 2. Crear Service

```javascript
export const NewEntityService = {
  getAll: () => Promise.resolve([...store.newEntity]),
  
  getById: (id) => {
    const entity = store.newEntity.find(e => e.id === id)
    return Promise.resolve(entity || null)
  },
  
  create: (data) => {
    const newEntity = {
      id: Math.max(...store.newEntity.map(e => e.id), 0) + 1,
      ...data,
      createdAt: new Date().toISOString()
    }
    store.newEntity.push(newEntity)
    return Promise.resolve(newEntity)
  },
  
  // ... más métodos
}
```

### 3. Usar en Componentes

```javascript
import { NewEntityService } from '../database/mockDatabase'

// En componente
useEffect(() => {
  const fetchData = async () => {
    const data = await NewEntityService.getAll()
    setData(data)
  }
  fetchData()
}, [])
```

---

## 🔄 Flujo de Git

### Commits

```bash
# Crear rama para feature
git checkout -b feature/nuevo-componente

# Hacer cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nuevo componente ModelCard

- Implementar React.memo para optimización
- Agregar estilos responsivos
- Documentar con PropTypes"

# Push
git push origin feature/nuevo-componente

# Crear Pull Request en GitHub
```

### Mensajes de Commit

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Cambios de documentación
style:    Formato, Sin cambios lógicos
refactor: Reorganización de código
perf:     Mejora de rendimiento
test:     Agregar tests
chore:    Tareas mantenimiento
```

---

## 🧪 Testing (Para v1.1+)

### Test Unitario de Función

```javascript
// tests/utils/helpers.test.js
import { formatCurrency } from '../../src/utils/helpers'

describe('formatCurrency', () => {
  test('formatea número como EUR', () => {
    expect(formatCurrency(100, 'EUR')).toBe('100,00 €')
  })
  
  test('maneja decimales', () => {
    expect(formatCurrency(99.99, 'USD')).toBe('$99.99')
  })
})
```

### Test de Componente

```javascript
// tests/components/ModelCard.test.jsx
import { render, screen } from '@testing-library/react'
import ModelCard from '../../src/components/ModelCard'

describe('ModelCard', () => {
  test('renderiza nombre del modelo', () => {
    const mockModel = {
      id: 1,
      name: 'Test Model',
      description: 'Test'
    }
    
    render(
      <ModelCard 
        model={mockModel} 
        onSelect={() => {}}
        isDarkMode={false}
      />
    )
    
    expect(screen.getByText('Test Model')).toBeInTheDocument()
  })
})
```

---

## 🐛 Debugging

### React DevTools

```
1. Instalar extension en Chrome/Firefox
2. Abrir DevTools (F12)
3. Ir a tab "Components"
4. Inspeccionar props y state en tiempo real
```

### Console.log Avanzado

```javascript
// ✅ Con etiqueta
console.log('%c ModelCard Props:', 'color: blue; font-weight: bold;', props)

// ✅ Tabla
console.table(models)

// ✅ Grupo
console.group('Form Validation')
console.log('Field:', field)
console.log('Error:', error)
console.groupEnd()
```

### Network Debugging

```
1. Abrir DevTools
2. Network tab
3. Ejecutar operaciones
4. Inspeccionar requests simulados
```

---

## 📈 Performance

### Optimizaciones Comunes

```javascript
// ❌ Crear función en cada render
<button onClick={() => handleClick(id)}>

// ✅ Usar useCallback
const handleClick = useCallback((id) => {
  // ...
}, [])
<button onClick={() => handleClick(id)}>

// ❌ Crear objeto en cada render
<Component style={{ color: 'red' }}>

// ✅ Crear una sola vez
const styles = { color: 'red' }
<Component style={styles}>
```

### Monitoreo con Lighthouse

```bash
1. Abrir DevTools (F12)
2. Tab "Lighthouse"
3. Click "Generate report"
4. Revisar métricas y sugerencias
```

---

## 📚 Recursos Útiles

### Documentación Oficial
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### Herramientas
- [Can I Use](https://caniuse.com) - Compatibilidad navegadores
- [Carbon](https://carbon.now.sh) - Snippets de código
- [JSON Formatter](https://jsonformatter.org)

### Comunidades
- [Stack Overflow](https://stackoverflow.com)
- [Dev.to](https://dev.to)
- [Reddit r/reactjs](https://reddit.com/r/reactjs)

---

## 🎓 Ejemplos Prácticos

### Usar MockDatabase

```javascript
import { ModelService } from '../database/mockDatabase'

function ModelList() {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await ModelService.getAll()
        setModels(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetch()
  }, [])

  if (loading) return <div>Cargando...</div>
  
  return (
    <div>
      {models.map(model => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  )
}
```

### Usar Custom Hook

```javascript
import { useLocalStorage } from '../hooks/useCustomHooks'

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle: {theme}
    </button>
  )
}
```

---

## 📋 Checklist Pre-Commit

- [ ] Código sigue estándares del proyecto
- [ ] ESLint sin errores (`npm run lint`)
- [ ] sin console.log de debug
- [ ] Props están documentados
- [ ] Componentes con React.memo (si aplica)
- [ ] Estilos incluidos
- [ ] Funciona en desarrollo (`npm run dev`)
- [ ] Compilación exitosa (`npm run build`)

---

**¡Gracias por contribuir al proyecto!** 🚀

Para preguntas: antonio@robledo.com

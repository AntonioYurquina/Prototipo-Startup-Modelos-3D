# 🚀 Quick Start Guide

Comienza con el proyecto en **5 minutos**.

---

## ⚡ Instalación Rápida

```bash
# 1. Clonar
git clone https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D.git
cd "Proyecto Robledo - Pyme Modelos 3D/Opciones UiUx"

# 2. Instalar
npm install

# 3. Ejecutar
npm run dev

# ✅ Abierto en http://localhost:5173
```

---

## 📱 Interfaz Principal

### Vistas Disponibles

```
┌─────────────────────────────────────┐
│  HEADER: Logo + Theme Toggle        │
├─────────────────────────────────────┤
│  SIDEBAR: Menú de navegación        │
│  - Modelos                          │
│  - Ventas                           │
│  - Clientes                         │
│  - Dashboard                        │
├─────────────────────────────────────┤
│  MAIN CONTENT: Contenido según tab  │
│                                     │
│  [Tab] [Tab] [Tab]                  │
│                                     │
│  Contenido...                       │
│                                     │
├─────────────────────────────────────┤
│  FOOTER: Info del proyecto          │
└─────────────────────────────────────┘
```

---

## 🎯 Tareas Comunes

### Ver Modelos 3D

```
1. Click en "Modelos"
2. Ve lista de productos
3. Click en tarjeta para detalles
4. Ver estadísticas (descargas, ventas)
```

### Registrar Venta

```
1. Click en "Ventas"
2. Click "Nueva Venta"
3. Seleccionar cliente
4. Seleccionar modelo
5. Ingresar cantidad
6. Click "Guardar"
```

### Ver Dashboard

```
1. Click en "Dashboard"
2. Ve 5 KPIs principales:
   - Ventas Totales ($)
   - Cantidad Vendida (unidades)
   - Ventas Completadas (count)
   - Ventas Pendientes (count)
   - Venta Promedio ($)
```

### Cambiar Tema

```
1. Click en ícono de luna/sol (arriba)
2. Interfaz cambia oscuro/claro
3. Se guarda automáticamente
```

---

## 📊 Datos Demo Incluidos

### 4 Modelos Precargados

| Nombre | Formato | Estado | Ventas |
|--------|---------|--------|--------|
| Sillón Moderno | GLB | Publicado | 12 |
| Mesa Minimalista | OBJ | Borrador | 0 |
| Lámpara Diseño | GLTF | Publicado | 8 |
| Silla Ergonómica | GLB | Publicado | 18 |

### 3 Clientes Demo

- Juan Pérez García - 5 compras ($2,500)
- María García López - 3 compras ($1,800)
- Carlos Rodríguez - 8 compras ($4,200)

### 3 Ventas Registradas

- VENTA-001: Realizada ✅
- VENTA-002: Realizada ✅
- VENTA-003: Pendiente ⏳

---

## 🔧 Estructura de Carpetas Rápida

```
src/
├── components/
│   ├── ModelCard.jsx       👈 Componente de tarjeta
│   ├── Dashboard.jsx       👈 Panel estadísticas
│   └── FormField.jsx       👈 Inputs reutilizables
│
├── database/
│   └── mockDatabase.js     👈 BD simulada + Services
│
├── hooks/
│   └── useCustomHooks.js   👈 Custom React hooks
│
├── utils/
│   └── helpers.js          👈 Funciones auxiliares
│
├── styles/
│   ├── ModelCard.css
│   ├── Dashboard.css
│   └── FormField.css
│
└── App.jsx                 👈 Componente principal
```

---

## 🎨 Personalización Rápida

### Cambiar Colores Primarios

```javascript
// En cualquier archivo .css:
:root {
  --primary: #3b82f6;      /* Azul actual */
  --success: #10b981;      /* Verde */
  --danger: #ef4444;       /* Rojo */
}
```

### Cambiar Nombre de Empresa

```javascript
// En App.jsx:
const COMPANY_NAME = "Mi Empresa de Modelos 3D"

// En README.md:
# Mi Empresa - Gestión de Modelos
```

### Agregar Nuevo Modelo

```javascript
// En mockDatabase.js:
store.models.push({
  id: 5,
  name: "Mi Nuevo Modelo",
  description: "Descripción del modelo",
  category: "muebles-sala",
  fileFormat: "glb",
  fileSize: 2.5,
  status: "draft",
  // ... más propiedades
})
```

---

## 🧪 Verificar que Funcione

### Checklist

```bash
✅ npm install - Sin errores
✅ npm run dev - Servidor inicia en puerto 5173
✅ Abrir http://localhost:5173 - Carga el sitio
✅ Ver Dashboard - Muestra 5 estadísticas
✅ Click tema - Cambia oscuro/claro
✅ Ver Modelos - Muestra 4 modelos
✅ Ver Ventas - Muestra 3 ventas
✅ npm run build - Compila sin errores
```

---

## 📚 Documentación Rápida

| Archivo | Propósito | Lee si... |
|---------|-----------|-----------|
| `README.md` | Descripción general | Quieres entender el proyecto |
| `ARCHITECTURE.md` | Decisiones técnicas | Necesitas entender el código |
| `DEVELOPMENT.md` | Cómo contribuir | Vas a desarrollar |
| `USE_CASES.md` | Ejemplos prácticos | Quieres ver cómo usar |
| `CHANGELOG.md` | Historia del proyecto | Necesitas versión específica |

---

## ⚙️ Scripts Útiles

```bash
# Desarrollo con hot reload
npm run dev

# Compilar para producción
npm run build

# Ver build compilado
npm run preview

# Verificar código
npm run lint

# Limpiar (opcional)
rm -rf node_modules package-lock.json
npm install
```

---

## 🐛 Problemas Comunes

### Problema: Puerto 5173 en uso

```bash
✅ Solución:
npm run dev -- --port 3000
```

### Problema: Changes no se reflejan

```bash
✅ Solución:
1. Guardar archivo (Ctrl+S)
2. Esperar hot reload (automático)
3. Si no: Ctrl+R en navegador
```

### Problema: npm install falla

```bash
✅ Solución:
# Limpiar caché
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Siguiente Paso

**Después del Quick Start:**

1. Lee [README.md](./README.md) para descripción completa
2. Explorar [ARCHITECTURE.md](./ARCHITECTURE.md) para entender cómo funciona
3. Ver [USE_CASES.md](./USE_CASES.md) para ejemplos prácticos
4. Lee [DEVELOPMENT.md](./DEVELOPMENT.md) si quieres desarrollar

---

## 💡 Tips Útiles

### DevTools en Browser
```
F12 → Components tab → Inspecciona props y state en tiempo real
```

### React.memo Visualization
```
Si cambias isDarkMode: Solo App se re-render
ModelCard: NO se re-render (está memozado)
```

### Mock Data Location
```
src/database/mockDatabase.js
- Aquí está toda la simulación de BD
- Puedes agregar más datos
- Es donde iría la API real después
```

---

## 🚀 Próximos Pasos (v1.1+)

```
Actual (v1.0):
└─ Mock Database en memoria

Futuro (v1.1):
├─ LocalStorage para persistencia
└─ Autenticación básica

Más futuro (v1.5):
├─ Backend API real
├─ Base de datos PostgreSQL
└─ Sistema de pagos

Producción (v2.0):
├─ Servidor enterprise
├─ CDN
└─ Monitoring 24/7
```

---

## 📞 Soporte

```
❓ Preguntas → Antonio Yurquina
📧 Email: antonio@robledo.com
🐙 GitHub: github.com/AntonioYurquina
📍 Issues: Abrir en repositorio
```

---

**¡Ahora estás listo para usar el proyecto!** 🎉

Nota: Este es un prototipo. No está recomendado para producción sin agregar autenticación real, base de datos y validaciones del servidor.

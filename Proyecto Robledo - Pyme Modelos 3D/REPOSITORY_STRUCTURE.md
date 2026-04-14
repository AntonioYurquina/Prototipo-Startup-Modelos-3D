# 🏭 Robledo PYME - Estructura del Proyecto Vinculada

## 📊 Estructura General

```
Proyecto Robledo - Pyme Modelos 3D/
├── Opciones UiUx/                          ← App React Refactorizado (ACTIVO)
│   ├── src/
│   │   ├── pages/                          ← Dashboard, Models, Sales
│   │   ├── features/                       ← LinkGenerator
│   │   ├── lib/                            ← Lógica de links
│   │   ├── components/                     ← Componentes reutilizables
│   │   ├── database/                       ← Mock database (5 servicios)
│   │   ├── hooks/                          ← Custom React hooks
│   │   ├── utils/                          ← Helpers y utilidades
│   │   ├── App.jsx                         ← Router principal
│   │   └── App.css                         ← Estilos globales
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── Prototipo-Startup-Modelos-3D/           ← Versión anterior (referencia)
│   └── [...contenido original]
│
├── github-repos/                           ← Repositorio clonado desde GitHub
│   └── Prototipo-Startup-Modelos-3D/       ← GitHub oficial
│       ├── .git/                           ← Historial git remoto
│       ├── assets/
│       ├── projecto/
│       ├── Proyecto Robledo - PYME Modelos 3D/
│       └── [archivos originales del repo]
│
├── sprint2.pdf                             ← Requerimientos Sprint 2
└── .vscode/

```

## 🔗 Carpetas Vinculadas

### 1. **Opciones UiUx/** (PRODUCCIÓN)
**Estado:** ✅ En desarrollo activo  
**Descripción:** App React refactorizada moduladamente para Sprint 2

**Estructura:**
- ✅ Router principal (App.jsx)
- ✅ 3 páginas (Dashboard, Models, Sales)
- ✅ Feature: LinkGenerator temporal
- ✅ Mock Database (5 servicios CRUD)
- ✅ Dark/Light mode

**Para trabajar:**
```bash
cd "Opciones UiUx"
npm install
npm run dev
```

### 2. **Prototipo-Startup-Modelos-3D/** (LOCAL)
**Estado:** 📦 Carpeta de referencia  
**Descripción:** Versión anterior del proyecto

**Contenido:**
- Versión original del código
- Recursos/assets locales
- Configuración previa

### 3. **github-repos/Prototipo-Startup-Modelos-3D/** (REMOTO)
**Estado:** 🔄 Sincronizado con GitHub  
**Descripción:** Clon del repositorio oficial  
**URL:** https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D

**Para actualizar desde GitHub:**
```bash
cd "github-repos/Prototipo-Startup-Modelos-3D"
git pull origin main  # (o la rama principal)
```

## 🔄 Flujo de Desarrollo

### Cambios en Opciones UiUx →  GitHub

```
1. Edita en: Opciones UiUx/src/
2. Prueba localmente: npm run dev
3. Commit a Opciones UiUx (si está en git)
4. Push a GitHub (tu repositorio)
5. Sync en github-repos/
```

### Sincronizar cambios de GitHub

```bash
# Ir a carpeta remota
cd "github-repos/Prototipo-Startup-Modelos-3D"

# Actualizar desde GitHub
git pull origin main

# Copiar cambios útiles a Opciones UiUx (manual)
cp -r github-repos/...[files] Opciones\ UiUx/src/
```

## 📋 Archivos Importantes

| Archivo | Ubicación | Propósito |
|---------|-----------|----------|
| App.jsx | Opciones UiUx/src/ | Router principal |
| DashboardPage.jsx | Opciones UiUx/src/pages/ | Dashboard KPIs |
| LinkGenerator.jsx | Opciones UiUx/src/features/ | Generador links temporales |
| mockDatabase.js | Opciones UiUx/src/database/ | 5 servicios CRUD |
| sprint2.pdf | `.` (raíz) | Requerimientos del sprint |

## 🚀 Comandos Útiles

### Desarrollar en Opciones UiUx
```bash
cd "Opciones UiUx"
npm install
npm run dev      # Ejecutar localmente
npm run build    # Compilar para producción
```

### Sincronizar con GitHub
```bash
# Desde la raíz del proyecto
cd "github-repos/Prototipo-Startup-Modelos-3D"
git status       # Ver cambios
git pull origin main  # Traer cambios remotos
git log --oneline     # Ver historial
```

### Ver cambios entre carpetas
```bash
# Comparar Opciones UiUx con versión anterior
diff -r "Opciones UiUx/src" "Prototipo-Startup-Modelos-3D"

# Ver diferencias más detalladas
diff -u "archivo1" "archivo2"
```

## 📊 Estadísticas del Proyecto

### Opciones UiUx (ACTUAL)
- **Componentes:** 3 páginas + 1 feature
- **Líneas de código:** 3500+
- **Servicios:** 5 (CRUD completo)
- **Hooks:** 8 personalizados
- **Helpers:** 20+ funciones
- **Archivos:** 30+ módulos

### GitHub (Remoto)
- **URL:** https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D
- **Ramas:** Ver en github.com
- **Commits:** Ver historial completo

## ✅ Cambios Implementados (Sprint 2)

En **Opciones UiUx/**:
- ✅ Refactorización completa (App.jsx: 1355 → 168 líneas)
- ✅ 3 páginas modulares (Dashboard, Models, Sales)
- ✅ LinkGenerator con expiración temporal
- ✅ Mock Database con 5 servicios
- ✅ Dark/Light mode con localStorage
- ✅ Documentación ARCHITECTURE.md
- ✅ CSS modular y responsive

En **github-repos/**:
- ✅ Repositorio completo sincronizado
- ✅ Git history preservado
- ✅ Posibilidad de hacer git pull regular

## 🔐 Git Remoto

Para mantener sincronizado con GitHub:

```bash
cd "github-repos/Prototipo-Startup-Modelos-3D"

# Ver información del remoto
git remote -v

# Expected output:
# origin  https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D.git (fetch)
# origin  https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D.git (push)

# Si necesitas cambiar el remoto:
# git remote set-url origin [nueva-url]
```

---

**Última actualización:** 2024  
**Versión:** 1.1.0  
**Estado:** ✅ Producción - Ready for Sprint 3

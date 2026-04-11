# Opciones UI/UX - Pyme Modelos 3D

Proyecto React + Vite para gestionar opciones de interfaz de usuario en aplicaciones de Modelos 3D.

## 🚀 Características

- ⚡ Vite para desarrollo rápido
- ⚛️ React 19+
- 🔍 ESLint configurado
- 📦 Listo para Deploy en GitHub Pages

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

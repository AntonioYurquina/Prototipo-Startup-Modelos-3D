# 📚 Guía de Deploy en GitHub Pages

Esta guía te ayudará a deployar el proyecto en GitHub Pages de forma automática.

## Paso 1: Crear un Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el icono `+` en la esquina superior derecha
3. Selecciona **New repository**
4. Nombra tu repositorio (ej: `opciones-uiux`)
5. Selecciona **Public** (para que sea visible en GitHub Pages)
6. Haz clic en **Create repository**

## Paso 2: Inicializar Git en tu Proyecto Local

```bash
cd "/ruta/al/proyecto/Opciones UiUx"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/opciones-uiux.git
git push -u origin main
```

Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.

## Paso 3: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, ve a **Pages**
4. En la sección "Build and deployment":
   - Source: Selecciona **GitHub Actions**
5. El workflow se ejecutará automáticamente

## Paso 4: Verificar el Deployment

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow `Deploy to GitHub Pages` ejecutándose
3. Cuando termine, tu sitio estará disponible en:
   ```
   https://tu-usuario.github.io/opciones-uiux/
   ```

## Paso 5: Configurar la Base URL (Opcional)

Si tu repositorio no se llama igual que tu usuario (lo normal), necesitas configurar `VITE_BASE_URL`:

1. Ve a **Settings** > **Secrets and variables** > **Actions**
2. Haz clic en **New repository secret**
3. Nombre: `VITE_BASE_URL`
4. Valor: `/nombre-repositorio/` (ej: `/opciones-uiux/`)
5. Haz clic en **Add secret**

Luego actualiza el workflow `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_URL: ${{ secrets.VITE_BASE_URL || '/' }}
```

## 🔄 Despliegues Automáticos

Cada vez que hagas push a la rama `main`:

1. GitHub Actions ejecutará automáticamente el workflow
2. El código se compilará
3. Se deployará en GitHub Pages

## ❌ Solucionar Problemas

### El workflow falla
- Ve a la pestaña **Actions** para ver el error
- Verifica que `npm install` y `npm run build` funcionan localmente

### El sitio no aparece
- Espera 1-2 minutos después del deployment
- Borra la caché del navegador (Ctrl+Shift+Delete)
- Verifica que Pages esté habilitado en Settings

### Rutas no funcionan
- Si tienes rutas SPA, asegúrate de que `vite.config.js` tenga la `base` configurada correctamente

## 📖 Recursos Adicionales

- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Guía Vite + React](https://vitejs.dev/guide/)

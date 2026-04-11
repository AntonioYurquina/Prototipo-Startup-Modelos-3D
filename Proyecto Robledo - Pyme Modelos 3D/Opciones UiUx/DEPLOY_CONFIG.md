# Configuración para Deploy

## Información del Proyecto

El proyecto está configurado para deployarse en GitHub Pages usando GitHub Actions.

### Archivos Clave para Deploy

- `.github/workflows/deploy.yml` - Workflow automático de CI/CD
- `vite.config.js` - Configuración con soporte para base URL
- `package.json` - Scripts y metadata
- `.gitignore` - Archivos a ignorar
- `GITHUB_DEPLOY.md` - Guía detallada de setup

### Instrucciones Rápidas

1. Crea un repositorio en GitHub
2. Sube tu código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/repo.git
   git push -u origin main
   ```
3. GitHub Pages se deployará automáticamente
4. Accede a: `https://tu-usuario.github.io/repo/`

### Variables de Entorno (Opcional)

Para un repositorio con nombre diferente al usuario, configura:
- Variable: `VITE_BASE_URL` 
- Valor: `/nombre-repositorio/`

### Scripts Disponibles

- `npm run dev` - Desarrollo local
- `npm run build` - Compilar para producción
- `npm run preview` - Preview del build
- `npm run lint` - Lint del código

Ver `GITHUB_DEPLOY.md` para instrucciones completas.

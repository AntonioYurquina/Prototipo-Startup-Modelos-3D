# Prototipo Startup Modelos 3D

MVP web para validar la viabilidad de un marketplace de modelos 3D bajo enfoque Lean Startup. La prioridad del proyecto no es construir una plataforma final ni una infraestructura compleja, sino medir si existe demanda real por compra de modelos y si el flujo operativo de venta puede sostenerse con una operación liviana.

## Idea del producto

La propuesta consiste en ofrecer modelos 3D listos para descargar en formatos como `.obj`, `.stl` y `.fbx`, orientados a clientes que necesitan assets visuales o imprimibles sin pasar por procesos de producción largos.

El producto parte de dos preguntas de negocio:

1. ¿Existe intención real de compra por modelos 3D curados y listos para usar?
2. ¿Es viable operar la venta y entrega con un flujo simple, semimanual y medible?

La respuesta a esas preguntas se valida con una SPA que concentra dos frentes:

1. Vista Cliente para capturar atención, vistas y clics de compra.
2. Vista Administración para cargar modelos, generar links temporales y revisar métricas.

## Enfoque Lean Startup

Este MVP está diseñado para validar, no para escalar. Por eso se toman decisiones deliberadas:

1. Checkout simulado en lugar de pasarela real.
2. Links de descarga temporales simulados en lugar de backend de archivos.
3. Estado local en frontend en lugar de base de datos o autenticación.
4. Dashboard operativo mínimo para validar la oferta y la operación manual.

La lógica es simple: si el usuario explora modelos, hace clic en comprar y completa el checkout simulado, hay una señal concreta de interés. Si además el administrador puede cargar productos y generar entregas temporales sin fricción, hay una señal operativa para continuar iterando.

## Problema que resuelve

Desde la perspectiva del cliente:

1. Descubrir modelos 3D de calidad de forma rápida.
2. Evaluar formato y precio sin navegar una plataforma compleja.
3. Simular una compra en un flujo familiar, parecido a un checkout de marketplace.

Desde la perspectiva operativa:

1. Cargar nuevos modelos sin depender de desarrollo backend.
2. Asociar el activo con su `ZipName`, formato y rutas simuladas.
3. Generar enlaces temporales según el flujo de venta de modelo.
4. Medir la respuesta del mercado antes de invertir en infraestructura completa.

## Hipótesis de validación

Este prototipo intenta validar las siguientes hipótesis:

1. Un catálogo visual simple es suficiente para generar interés inicial.
2. Un botón `Comprar` con checkout simulado puede medir intención de compra más allá de visitas pasivas.
3. Los usuarios valoran claridad en nombre del modelo, formato y precio.
4. El flujo operativo de venta y entrega puede iniciar con una solución semimanual usando links temporales.
5. El administrador necesita un panel más orientado a operación y métricas que a estética avanzada.

## Alcance funcional del MVP

### Vista Cliente

Incluye:

1. Hero section con propuesta de valor.
2. Catálogo en grilla de cards.
3. Card con imagen, nombre, formato y CTA de compra.
4. Simulación de checkout estilo marketplace.

Objetivo:

1. Medir visualizaciones de modelos.
2. Medir clics en compra.
3. Medir cierres simulados del checkout.

### Dashboard Robledo

Incluye:

1. Gestión de modelos.
2. Formulario para alta de producto.
3. Generador interno de links temporales.
4. Panel de métricas de validación.
5. Tabla del flujo de venta de modelo.

Objetivo:

1. Validar la capacidad de cargar oferta.
2. Validar la lógica operativa de entrega.
3. Concentrar métricas para tomar decisiones rápidas.

## Modelo conceptual de datos

Aunque el proyecto no usa backend todavía, el estado de la aplicación respeta la relación lógica entre las entidades del DER trabajado:

### Modelo

Campos principales:

1. `id`
2. `nombrePublicado`
3. `formato`
4. `zipName`
5. `filePath`
6. `price`
7. `images`

### Imagen

Campos principales:

1. `id`
2. `modelId`
3. `url`

### Cliente

Campos principales:

1. `id`
2. `nombre`
3. `email`
4. `telegram`

### Venta

Campos principales:

1. `id`
2. `modelId`
3. `clientId`
4. `fechaHoraCompra`
5. `status`
6. `checkoutProvider`

## Flujo de negocio modelado en la app

1. El cliente entra al catálogo.
2. Visualiza un modelo o inicia una compra.
3. Se registra una venta iniciada.
4. El cliente completa datos en el checkout simulado.
5. La venta pasa a estado `completed`.
6. El cliente queda asociado a la venta.
7. El administrador puede generar un link temporal para la entrega.

Este flujo representa el concepto de integración posterior con medios de pago y canales operativos como marketplace, mensajería o entrega por archivo temporal.

## Métricas de validación

Las métricas actuales buscan responder si hay interés real y si el flujo convierte:

1. Cantidad de clics en `Comprar`.
2. Modelos más vistos.
3. Tasa de conversión simulada.
4. Historial visible de ventas iniciadas y completadas.

Interpretación esperada:

1. Muchas vistas y pocos clics indican problema de propuesta, precio o formato.
2. Muchos clics y pocos checkouts completos indican fricción en el flujo o baja confianza.
3. Alta concentración en pocos modelos ayuda a detectar categorías con mejor demanda.

## Stack técnico

1. React
2. Vite
3. Tailwind CSS
4. Lucide React

La aplicación está construida como SPA con un estado local que permite iterar rápido sobre producto, UX y medición sin introducir complejidad de backend antes de tiempo.

## Estructura de navegación

La interfaz se divide en dos modos:

1. `Vista Cliente`
2. `Dashboard Robledo`

Esto permite representar claramente los dos roles del flujo:

1. Cliente que compra o expresa intención de compra.
2. Operador que carga modelos, gestiona entregas y revisa métricas.

## Estado actual del proyecto

Actualmente el MVP implementa:

1. Catálogo visual de modelos 3D.
2. Checkout simulado.
3. Alta de modelos desde dashboard.
4. Generador de links temporales.
5. Métricas de vistas, clics y conversión.
6. Despliegue preparado para GitHub Pages con GitHub Actions.

Limitaciones actuales:

1. No hay persistencia de datos.
2. No hay autenticación.
3. No hay pasarela de pago real.
4. No hay almacenamiento real de archivos.
5. Los links temporales son simulados.

## Próximos pasos sugeridos

1. Persistir modelos, clientes y ventas en una base ligera o backend serverless.
2. Integrar analítica real como PostHog, Mixpanel o GA4.
3. Reemplazar checkout simulado por una validación de pago controlada.
4. Integrar almacenamiento real para assets y expiración real de links.
5. Incorporar segmentación por categorías, estilos o industrias.

## Desarrollo local

Instalación:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

## Deploy

El repositorio quedó preparado para deploy en GitHub Pages mediante GitHub Actions.

Archivos relevantes:

1. [vite.config.js](vite.config.js)
2. [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)

Nota importante:

Para que GitHub Pages publique el build correcto, en la configuración del repositorio debe estar seleccionado `GitHub Actions` como source en `Settings > Pages`.

## Resumen ejecutivo

Este proyecto no intenta demostrar una plataforma final de comercio de modelos 3D. Intenta demostrar algo más importante en esta etapa: si vale la pena construirla.

El MVP concentra lo esencial:

1. Captar demanda.
2. Organizar oferta.
3. Simular venta.
4. Medir señales.
5. Aprender rápido con bajo costo técnico.

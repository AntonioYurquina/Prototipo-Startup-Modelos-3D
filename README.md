# Prototipo Startup Modelos 3D

Marketplace MVP para validar demanda de modelos 3D con enfoque Lean Startup.

## Sobre este proyecto

Este proyecto es una Single Page Application construida para evaluar si existe traccion real para vender modelos 3D digitales y si el flujo operativo de oferta, compra y entrega puede ejecutarse con una arquitectura liviana.

Objetivo principal:

1. Validar demanda (usuarios que visualizan, hacen clic y completan compra simulada).
2. Validar oferta (carga operativa de nuevos modelos y entrega por links temporales).

## Problema y oportunidad

Muchos potenciales compradores de assets 3D necesitan encontrar y obtener modelos listos para usar sin depender de procesos largos o tiendas con friccion alta.

Este MVP busca responder:

1. Si una experiencia simple de catalogo + checkout puede capturar intencion de compra.
2. Si un panel operativo minimo permite gestionar productos y entregas en etapa temprana.

## Solucion implementada

La app esta dividida en dos vistas:

1. Vista Cliente:
Hero de venta, catalogo en cards y checkout simulado.
2. Dashboard Robledo:
Gestion de modelos, generador de links temporales y panel de metricas.

## Funcionalidades clave

1. Catalogo de modelos 3D con imagen, nombre, formato y precio.
2. Checkout simulado estilo marketplace para validar intencion de compra.
3. Alta de modelos con campos de negocio: `NombrePublicado`, `Formato`, `ZipName`, `Path` e imagenes.
4. Generacion de links temporales simulados para entrega.
5. Metricas en tiempo real dentro del dashboard:
Cantidad de clics en comprar, modelos mas vistos y conversion simulada.
6. Tabla de flujo de ventas con estado de intento o completada.

## Modelo de datos (frontend state)

Entidades representadas en el estado de la app:

1. Modelo:
`id`, `nombrePublicado`, `formato`, `zipName`, `filePath`, `price`, `images`.
2. Imagen:
`id`, `modelId`, `url`.
3. Cliente:
`id`, `nombre`, `email`, `telegram`.
4. Venta:
`id`, `modelId`, `clientId`, `fechaHoraCompra`, `status`, `checkoutProvider`.

Relaciones clave:

1. Un modelo puede tener multiples imagenes.
2. Una venta referencia a un modelo y opcionalmente a un cliente.
3. El checkout convierte una venta iniciada en venta completada.

## Stack tecnico

1. React
2. Vite
3. Tailwind CSS
4. Lucide React

## Enfoque de producto

Este desarrollo prioriza aprendizaje rapido sobre complejidad tecnica:

1. Checkout simulado en vez de pasarela real.
2. Links temporales simulados en vez de backend de storage.
3. Estado local en vez de infraestructura de datos.

Esto reduce costo de experimentacion y acelera iteraciones de negocio.

## Arquitectura de validacion

Flujo resumido:

1. Usuario explora catalogo.
2. Usuario inicia compra (`sale initiated`).
3. Usuario completa checkout simulado (`sale completed`).
4. Operador genera link temporal para entrega.
5. Dashboard agrega senales para decision de siguiente iteracion.

## Resultado esperado del MVP

Este proyecto no busca ser la version final del marketplace. Busca generar evidencia para responder si conviene invertir en una version escalable.

Se consideran senales positivas:

1. Alta tasa de clic en comprar por sesion.
2. Conversion consistente de intentos a compras simuladas.
3. Modelos con patrones claros de interes.
4. Flujo operativo simple y sostenible para carga y entrega.

## Roadmap

1. Persistencia real (backend y base de datos).
2. Integracion de analitica (PostHog, Mixpanel o GA4).
3. Integracion de pago real.
4. Entrega real de archivos con expiracion segura.
5. Gestion por categorias, etiquetas y recomendaciones.

## Demo y repositorio

1. Repositorio:
https://github.com/AntonioYurquina/Prototipo-Startup-Modelos-3D
2. URL esperada de Pages:
https://antonioyurquina.github.io/Prototipo-Startup-Modelos-3D/

Nota:
Para publicar correctamente en GitHub Pages, el repositorio debe tener `GitHub Actions` seleccionado como source en `Settings > Pages`.

## Desarrollo local

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Autor

Antonio Yurquina

Proyecto de validacion de negocio y producto digital para marketplace de modelos 3D.

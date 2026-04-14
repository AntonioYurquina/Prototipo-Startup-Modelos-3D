# 📊 PROPUESTA TÉCNICA DE PROYECTO
## Implementación de Módulo de Venta por Metros Cuadrados - Sistema BABA

**Versión:** 0.1 (Borrador para revisión)  
**Fecha:** 12 de abril de 2026  
**Responsables:** Tony, Robledo  
**Metodología:** Scrum Ágil (Sprints de 10 días hábiles)

---

## 1️⃣ OBJETIVOS

### 1.1 Objetivos del Producto

**Objetivo General:**
Implementar un módulo de venta por metros cuadrados en el sistema BABA que permita fraccionar vendidas de lotes, manteniendo la compatibilidad con el sistema actual sin interrumpir operaciones.

**Objetivos Específicos:**

1. **Flexibilidad Comercial**
   - Permitir la venta de fracciones de lotes (Ej: cliente compra 500 m² de un lote de 2000 m²)
   - Soportar múltiples fraccionamientos en el mismo lote
   - Mantener control automático de metros disponibles

2. **Cálculo Automático de Precios**
   - Formula: Precio Total = Metros Solicitados × Precio Unitario ($/m²)
   - Reducción de errores manuales
   - Transparencia al cliente

3. **Documentación Automática**
   - Generación de comprobantes de fraccionamiento
   - Integración con sistema de documentación legal
   - Auditoría de cambios

4. **Reportes y Visibilidad**
   - Dashboard de disponibilidad por lote
   - Reportes de ventas por metros vs. lotes completos
   - Trazabilidad completa de fraccionamientos

---

### 1.2 Objetivos del Proyecto

1. **Implementar** un parche funcional sin tumbar el sistema actual
2. **Validar** la viabilidad técnica de la venta por metros en ~2 sprints (20 días hábiles)
3. **Entregar un prototipo funcional** antes de la presentación final para revisión
4. **Documentar el sistema** completamente para soporte y mantenimiento futuro
5. **Capacitar a los usuarios** (vendedores, gerentes, administrativos)
6. **Go-live seguro** con plan de rollback disponible

---

## 2️⃣ ALCANCE

### 2.1 ¿QUÉ SÍ ESTÁ INCLUIDO?

✅ **Funcionalidades Principales:**
- Consulta de disponibilidad de metros en cada lote
- Registro de fraccionamiento de lote en el sistema
- Cálculo automático de precio basado en metros
- Actualización de estado del lote (% vendido, % disponible)
- Generación de comprobante de fraccionamiento
- Reporte de ventas por metros
- Control de auditoría de cambios

✅ **Entregables Técnicos:**
- Código del módulo (comentado y documentado)
- Base de datos actualizada con nuevas tablas/campos
- Documentación técnica (ER, API, casos de uso)
- Manual de usuario actualizado
- Plan de testing y resultados
- Script de deployment

✅ **Capacitación:**
- Videos tutoriales algorítmicos
- Documentación de procedimientos
- Sesiones de Q&A con usuarios clave
- Material de apoyo descargable

---

### 2.2 ¿QUÉ NO ESTÁ INCLUIDO?

❌ **Fuera de Alcance:**
- Creación de nuevo sistema completamente (responsabilidad de Daniel - otro ingeniero)
- Modificación de infraestructura de red (responsabilidad de Daniel - informático)
- Integración con sistemas externos (escribanía, municipal) - **Será propuesta futura**
- Cambios en política de precios o descuentos (decisión de dirección)
- Migración masiva de datos históricos (será propuesta aparte)
- Personalización por sucursal (alcance solo sucursal capital)

---

### 2.3 Supuestos del Alcance

- ✅ Acceso completo a ambiente de desarrollo de BABA
- ✅ Participación de Matías en entrevistas y validaciones
- ✅ Aprobación del dueño (Daniel) en puntos de decisión
- ✅ No hay cambios de infraestructura requeridos
- ✅ Calendario de 60 días hábiles disponible

---

## 3️⃣ ANÁLISIS DE CONTEXTO

### 3.1 Descripción de la Organización

**Nombre:** [Nombre empresa - obtener de Matías]  
**Sector:** Inmobiliario / Venta de Lotes  
**Localización:** Capital (Sede principal mencionada)  
**Tamaño:** Empresa con múltiples sucursales, operaciones consolidadas  

**Estructura Organizacional Relevante:**
```
Dueño (Daniel)
  ├── Gerencia General / Matías (Encargado Sucursal Capital)
  │   ├── Vendedores
  │   ├── Personal Administrativo
  │   └── Equipo de Tesorería
  │
  └── TI (Daniel - Informático)
      └── Infraestructura / Red
```

**Cultura Organizacional:**
- Operaciones tradicionales, orientadas a procesos consolidados
- Sistemas legados pero funcionales (BABA en uso desde años)
- Apertura a mejoras que no interrumpan operaciones
- Énfasis en documentación y cumplimiento legal

---

### 3.2 Contexto del Proyecto

**Oportunidad de Negocio:**
- Mercado demanda flexibilidad en tamaño de lotes
- Competidores ofrecen fraccionamiento
- Potencial de aumentar volumen de ventas
- Aprovechar territorio disponible de forma más eficiente

**Restricciones:**
- Sistema actual está en producción continua
- No se puede interrumpir operaciones
- Cambios deben ser reversibles
- Presupuesto limitado (otra oportunidad / menor presupuesto que nuevo sistema)

**Motivación Estratégica:**
- Modernizar ofertas operando sistema actual
- Validar viabilidad técnica antes de gran inversión en nuevo sistema
- Capacitar equipo en nuevos procesos

---

## 4️⃣ SISTEMA DE INFORMACIÓN EXISTENTE

### 4.1 Sistema BABA Actual

**Características Generales:**
- Aplicación web basada en marcos de trabajo genéricos
- Servidor Ubuntu 22.04 con Apache
- Base de datos MariaDB
- DNS protegido (acceso solo desde red interna)
- En operación continua sin interrupciones planeadas

**Funcionalidades Actuales:**
- Gestión de lotes (registro, disponibilidad)
- Registro de ventas (por lote completo)
- Generación de comprobantes
- Reportes básicos
- Control de usuarios y permisos

**Limitaciones Actuales:**
- Solo soporta venta de lotes completos
- Sin cálculo automático de precios parciales
- Reportes manuales o generados con dificultad
- Control de disponibilidad poco granular

---

### 4.2 Infraestructura Informática Actual

**Arquitectura:**
- Servidor web: Apache/2.4.52
- Base de datos: MariaDB en puerto 5436
- Almacenamiento: /var/www/babasyscaja/
- Conectividad: DNS dinámico protegido (sysbabacaja.duckdns.org)

**Acceso:**
- Solo desde Red WiFi de la empresa
- Credenciales específicas por usuario
- Logs de acceso disponibles

**Respaldo:**
- Backups periódicos de BD (frecuencia a confirmar con Daniel)
- Capacidad de recuperación existente

**Limitaciones:**
- Puertos especificados no accesibles desde fuera (restricción intencional por seguridad)
- Limitaciones de bandwidth en red actual
- Capacidad de procesamiento: [A confirmar con Daniel]

---

### 4.3 Cultura Organizacional

**Actitud hacia Tecnología:**
- Abierta a cambios que mejoren eficiencia
- Enfoque en estabilidad y continuidad
- Documentación legal rigurosa

**Capacitación:**
- Personal comercial con conocimientos de BABA
- Generación más tradicional (resistencia potencial a cambios)
- Disponibilidad para capacitación: [A confirmar]

**Necesidades Estratégicas de Información:**
1. **Visibilidad de Ventas:** Dashboard de disponibilidad por lote
2. **Análisis de Performance:** Comparativa lotes completos vs. fraccionados
3. **Control Financiero:** Integración con tesorería (futura)
4. **Cumplimiento Legal:** Auditoría de cambios y documentación

---

## 5️⃣ ANÁLISIS TÉCNICO OPERATIVO

### 5.1 Definición del Producto a Implementar

#### **Módulo: Venta por Metros Cuadrados**

**Componentes:**

1. **Frontend - Interfaz de Usuario**
   - Nueva vista: "Venta de Fracción"
   - Campos: Lote, Metros deseados, Cliente, Precio/m²
   - Validaciones: metros disponibles, restricciones
   - Cálculo instantáneo de precio total

2. **Backend - Lógica de Negocio**
   - API de fraccionamiento de lote
   - Validador de disponibilidad de metros
   - Motor de cálculo de precios
   - Generador de comprobante

3. **Base de Datos - Nueva Estructura**
   - Tabla: `fraccionamientos_lote`
   - Campos:
     - `id_fraccionamiento` (PK)
     - `id_lote` (FK)
     - `id_cliente` (FK)
     - `metros_vendidos` (decimal)
     - `precio_unitario` (decimal)
     - `precio_total` (decimal)
     - `fecha_venta` (datetime)
     - `estado` (enum: pendiente, confirmado, anulado)
     - `creado_por` (usuario)
     - `fecha_creacion` (timestamp)

   - Tabla: `lote` (MODIFICADA)
     - Agregar campos:
       - `metros_vendidos_acumulado` (decimal)
       - `metros_disponibles` (decimal, calculado)
       - `ultima_actualizacion` (timestamp)
     - Índices por disponibilidad

4. **Reportes**
   - Reporte: "Disponibilidad por Lote" (en tiempo real)
   - Reporte: "Ventas por Fracción" (últimos 30 días)
   - Reporte: "Cliente - Detalle de Compra"

---

### 5.2 Infraestructura Necesaria

**Cambios Mínimos Requeridos:**
- ✅ Almacenamiento: [A confirmar con Daniel - probablemente suficiente]
- ✅ Procesamiento: [A confirmar con Daniel]
- ✅ Memoria: [A confirmar con Daniel]
- ✅ Ancho de banda: [A confirmar con Daniel]

**NO Requiere:**
- Cambios de red
- Cambios de servidor
- Nuevos equipos
- Cambios de permisos de firewall (acceso interno)

**Ambientes Necesarios:**
1. **Desarrollo:** Local (Tony + Robledo)
2. **Testing:** En servidor empresa (con datos de prueba)
3. **Producción:** Servidor actual de BABA

---

### 5.3 Metodología de Diseño: Scrum Ágil

**Framework:**
- Metodología: Scrum
- Duración Sprint: 10 días hábiles (2 semanas calendario)
- Equipos: Tony (Análisis/Arquitectura) + Robledo (Desarrollo/Testing)
- Iteraciones esperadas: 3-4 sprints

**Ceremonia Scrum:**

| Ceremonia | Frecuencia | Duración | Participantes |
|-----------|-----------|----------|---------------|
| Sprint Planning | Cada 10 días | 1 hora | Tony, Robledo, PO (Matías) |
| Daily Standup | Diario | 15 min | Tony, Robledo |
| Sprint Review | Cada 10 días | 1 hora | Tony, Robledo, Matías, Dueño |
| Sprint Retrospective | Cada 10 días | 30 min | Tony, Robledo |

**Deliverables por Sprint:**
- Código funcional (aunque sea parcial)
- Documentación actualizada
- Tests unitarios pasando
- Listo para demostración

---

### 5.4 Plan de Capacitación

**Enfoque: Videos Tutoriales Algorítmicos**

#### **Módulo 1: Entendimiento Conceptual (Día 1)**
- **Video 1.1:** "¿Por qué venta por metros?" (Contexto negocio) - 5 min
- **Video 1.2:** "Flujo de venta actual vs. nuevo" (Comparativa) - 10 min
- **Quiz:** Validar entendimiento conceptual

#### **Módulo 2: Uso del Sistema (Día 10)**
- **Video 2.1:** "Consultar disponibilidad de lote" (Paso a paso) - 8 min
- **Video 2.2:** "Registrar fraccionamiento" (Con ejemplos) - 12 min
- **Video 2.3:** "Validar comprobante generado" (Verificación) - 5 min
- **Ejercicio Práctico:** Completar transacción de prueba

#### **Módulo 3: Reportes y Auditoría (Día 15)**
- **Video 3.1:** "Generar reporte de disponibilidad" - 8 min
- **Video 3.2:** "Ver auditoría de cambios" - 6 min
- **Video 3.3:** "Resolver problemas comunes" - 10 min

#### **Módulo 4: Casos Especiales (Día 20)**
- **Video 4.1:** "¿Qué pasa si quedan metros sin vender?" - 7 min
- **Video 4.2:** "Anular una venta fraccionada" - 8 min
- **Video 4.3:** "Preguntas frecuentes" - 15 min

**Entregables:**
- 15 videos HD (1080p) alojados en youtube/interno
- Guía PDF para imprimir
- Preguntas frecuentes documentadas
- Contacto Tony/Robledo para soporte post-launch

---

### 5.5 Plan de Ingeniería del Proyecto

#### **Timeline: Sprints de 10 días hábiles**

```
Proyecto: BABA - Venta por Metros Cuadrados
Duración Total: ~50 días hábiles (10 semanas)
Inicio: [Semana siguiente a aprobación]
Go-Live: [A definir después de entrevistas]

SPRINT 1 (Días 1-10): ANÁLISIS Y ARQUITECTURA
├─ Día 1-2: Entrevista con Matías (completar documentación)
├─ Día 3-5: Análisis técnico (BD actual, códigos actuales)
├─ Día 6-8: Diseño de arquitetura (Diagramas ER, API spec)
├─ Día 9-10: Prototipo mínimo viable
└─ ENTREGABLE: Documento de especificaciones, Código base

SPRINT 2 (Días 11-20): DESARROLLO MÓDULO CORE
├─ Día 11-12: Setup ambiente (Git, test DB, CI/CD)
├─ Día 13-15: Desarrollo Backend (API, validaciones)
├─ Día 16-18: Desarrollo Frontend (Vistas, formularios)
├─ Día 19: Testing unitario
├─ Día 20: Sprint Review con Matías
└─ ENTREGABLE: Módulo funcional sin fracionar lotes

SPRINT 3 (Días 21-30): FRACCIONAMIENTO Y REPORTES
├─ Día 21-22: Lógica de fraccionamiento múltiple
├─ Día 23-25: Generación de reportes
├─ Día 26-27: Testing de integración
├─ Día 28-29: Optimización y bugfixes
├─ Día 30: PROTOTIPO FUNCIONAL COMPLETO
└─ ENTREGABLE: Prototype para revisión de Matías/Dueño

SPRINT 4 (Días 31-40): CAPACITACIÓN Y DOCUMENTACIÓN
├─ Día 31-35: Grabación de videos tutoriales
├─ Día 36-37: Documentación técnica final
├─ Día 38: Capacitación a usuarios piloto
├─ Día 39-40: Ajustes finales basados en feedback
└─ ENTREGABLE: Todos videos, docs, usuarios capacitados

SPRINT 5 (Días 41-50): TESTING Y GO-LIVE
├─ Día 41-42: Testing en ambiente de producción (datos reales)
├─ Día 43: Validación final con Matías
├─ Día 44: Aprobación del Dueño
├─ Día 45: Preparación de rollback
├─ Día 46: GO-LIVE (horario de mantenimiento)
├─ Día 47-50: Soporte intensivo post-launch
└─ ENTREGABLE: Sistema en producción, Plan de rollback activado
```

---

#### **Diagrama de Gantt (Fases y Entregables)**

```
FASE 1: ANÁLISIS (Días 1-10)
│ Entrevistas        ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (Días 1-5)
│ Análisis Técnico   ░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (Días 3-8)
│ Especificaciones   ░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ (Días 6-10)

FASE 2: DESARROLLO (Días 11-30)
│ Backend            ░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░ (Días 11-20)
│ Frontend           ░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░ (Días 16-22)
│ Testing Int.       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░ (Días 26-30)

FASE 3: CAPACITACIÓN (Días 31-40)
│ Grabación Videos   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████████░░ (Días 31-35)
│ Documentación      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░ (Días 36-37)
│ Capacitación       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░███░ (Días 38-40)

FASE 4: DEPLOYMENT (Días 41-50)
│ QA en Prod.        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░███ (Días 41-43)
│ GO-LIVE            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█ (Día 46)
│ Soporte POST       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████ (Días 47-50)

HITOS CLAVE:
★ Día 10: Especificaciones finales aprobadas
★ Día 20: Primer módulo funcional (Sprint Review)
★ Día 30: ⭐ PROTOTIPO FUNCIONAL COMPLETO (Presentación a Dueño)
★ Día 40: Capacitación completada
★ Día 46: 🚀 GO-LIVE en producción
```

---

#### **Entregables Detallados por Sprint**

| Sprint | Entregable | Descripción | Responsable |
|--------|-----------|-------------|-------------|
| 1 | Especificaciones | Documento con requisitos finales | Tony |
| 1 | Diagrama ER | Esquema de BD actualizado | Tony |
| 1 | Prototipo Mínimo | Interfaz básica sin lógica | Robledo |
| 2 | API Completa | Endpoints para fraccionamiento | Robledo |
| 2 | Interfaz Funcional | Formulario de venta con validaciones | Robledo |
| 2 | Tests Unitarios | Cobertura > 80% | Tony, Robledo |
| 3 | Módulo Completo | Código listo para testing | Robledo |
| 3 | Reportes | Dashboard y reportes funcionales | Robledo |
| 3 | PROTOTIPO FINAL | ⭐ Listo para presentación | Tony, Robledo |
| 4 | Videos Tutorial | 15 videos en formato HD | Tony |
| 4 | Documentación | Manual técnico y usuario | Tony |
| 5 | Testing Report | Casos de test ejecutados | Tony |
| 5 | Rollback Plan | Procedimiento de reversión | Tony |
| 5 | Go-Live Package | Código + scripts + documentación | Tony, Robledo |

---

## 6️⃣ PLAN DE MITIGACIÓN DE RIESGOS

### 6.1 Matriz de Riesgos

| #   | Riesgo                                       | Impacto | Prob. | Severidad  | Mitigación                                                              |
| --- | -------------------------------------------- | ------- | ----- | ---------- | ----------------------------------------------------------------------- |
| R1  | Especificaciones incompletas de Matías       | Alto    | Alta  | 🔴 CRÍTICO | Entrevistas frecuentes, validación semanal, documentar supuestos        |
| R2  | Incompatibilidad con sistema actual          | Alto    | Media | 🔴 CRÍTICO | Análisis profundo en Sprint 1, test integración frecuente               |
| R3  | Performance: lentitud con lotes muchos datos | Medio   | Media | 🟡 ALTO    | Diseñar índices BD, optimización en Sprint 3                            |
| R4  | Datos de base muy viejos/corruptos           | Medio   | Baja  | 🟡 ALTO    | Validar BD en Sprint 1, limpieza si es necesario                        |
| R5  | Cambios de requerimiento mid-project         | Medio   | Alta  | 🟡 ALTO    | Usar Scrum para cambios planificados, congelamiento 1 semana pre-launch |
| R6  | Falta de documentación técnica existente     | Bajo    | Alta  | 🟡 ALTO    | Documentar todo al codificar, pair programming                          |
| R7  | Rechazo de usuarios a cambios                | Medio   | Media | 🟡 ALTO    | Capacitación robusta, soporte post-launch, gather feedback              |
| R8  | Presupuesto insuficiente para extras         | Bajo    | Baja  | 🟢 BAJO    | Mantener solo incrementos funcionales, scope control                    |
| R9  | Acceso limitado a servidor                   | Alto    | Baja  | 🔴 CRÍTICO | Coordinar con Daniel (informático) desde inicio, permisos escritos      |
| R10 | Timeline ajustado                            | Medio   | Media | 🟡 ALTO    | Buffers en cada sprint, priorizar features core                         |

---

### 6.2 Descripción Detallada de Riesgos Críticos

#### **R1: Especificaciones Incompletas**
- **Descripción:** Matías o dueño no proporcionan claridad sobre requerimientos
- **Impacto:** Retrasos, recodificación, insatisfacción con producto final
- **Probabilidad:** Alta (Históricamente, "no muchas especificaciones")
- **Mitigación:**
  - [ ] Entrevista detallada en Día 2 (entregable: documento de especificaciones)
  - [ ] Revisión semanal con Matías (Viernes 15:00)
  - [ ] Documentar todos los supuestos explícitamente
  - [ ] Obtener aprobación escrita de especificaciones antes de Sprint 2

---

#### **R2: Incompatibilidad Sistema Actual**
- **Descripción:** El código/BD actual están tan enmarañados que cambios rompen funcionalidades
- **Impacto:** Sistema BABA no funciona, pérdida de confianza, rollback total
- **Probabilidad:** Media (Sistema legacy, pero en uso)
- **Mitigación:**
  - [ ] Análisis profundo en Sprint 1: leer código completo, entender arquitectura
  - [ ] Mantener copia de DB original para comparación
  - [ ] Testing de integración diario en ambiente de testing
  - [ ] Planificar rollback desde Día 1 (no esperar el final)
  - [ ] Usar feature flags para activar/desactivar nueva funcionalidad

---

#### **R9: Acceso Limitado a Servidor**
- **Descripción:** Daniel (informático) no proporciona acceso o credenciales incorrectas
- **Impacto:** No se puede trabajar, proyecto paralizado
- **Probabilidad:** Baja (ya hay acceso parcial), pero crítico si ocurre
- **Mitigación:**
  - [ ] Obtener confirmación escrita de acceso necesario (email)
  - [ ] Probar acceso el Día 1, no esperar
  - [ ] Tener ambiente local de desarrollo como Plan B
  - [ ] Documentar todos los accesos requeridos

---

### 6.3 Plan de Respuesta por Riesgo

**Si R1 ocurre (Especificaciones incompletas):**
```
Acción Inmediata:
1. Agendar reunión urgente con Matías + Dueño
2. Listar 3 escenarios posibles (A, B, C)
3. Pedir decisión en máximo 2 días
4. Documentar decisión y continuar

Impacto en Timeline:
- Suma 2-3 días si es cambio menor
- Suma 5-7 días si es cambio mayor
- Se reconsidera go-live si es cambio crítico
```

**Si R2 ocurre (Incompatibilidad):**
```
Acción Inmediata:
1. Parar cambios en producción
2. Revisar código impactado
3. Evaluar si es reversible (feature flag)
4. Si no: rollback del cambio
5. Reunión con Daniel (informático) para Plan C

Impacto en Timeline:
- Suma 3-5 días de re-análisis
- Posible cambio de arquitectura
- Go-live podría retrasarse 1-2 semanas
```

**Si R9 ocurre (Sin acceso):**
```
Acción Inmediata:
1. Contactar Daniel inmediatamente (email + teléfono)
2. Usar entorno local mientras se resuelve
3. Pedir escalada al dueño si Daniel no responde en 24h

Impacto en Timeline:
- Suma 2-5 días
- Posible retraso total del proyecto si se extiende
```

---

### 6.4 Matriz de Contingencia - Plan B y C

#### **Plan A (Ideal)**
```
Sprint 1-2: Análisis + Dev en ambiente local
Sprint 3: Testing en ambiente testing empresa
Sprint 4: Capacitación
Sprint 5: Go-live en producción
Timeline: 50 días hábiles
```

#### **Plan B (Acceso limitado)**
```
Si acceso a servidor es lento/limitado:
- Usar VM local con copia de BD
- Testing en local el máximo posible
- Acceso a servidor real solo para integración final
Timeline: +5-10 días por demoras de coordinación
```

#### **Plan C (Requerimientos drásticos)**
```
Si requerimientos cambian significativamente en Sprint 2:
- Congelar funcionalidades secundarias
- Mantener solo core: fraccionamiento + cálculo de precio
- Ver secundarias (reportes avanzados) como Fase 2 futura
Timeline: Puede reducir a 35 días si se necesita rápido
```

---

## 7️⃣ CONCLUSIONES Y PRÓXIMOS PASOS

### 7.1 Resumen Ejecutivo

| Aspecto | Resumen |
|---------|---------|
| **Objetivo** | Implementar módulo de venta por metros cuadrados en BABA |
| **Método** | Scrum ágil, parche funcional sin tumbar sistema actual |
| **Duración** | 50 días hábiles (10 semanas) |
| **Equipo** | Tony + Robledo |
| **Entregable Clave** | Prototipo funcional Día 30 para revisión |
| **Riesgos Principales** | Especificaciones, incompatibilidad, acceso servidor |
| **Go-Live** | Día 46 (condicionado a aprobación) |

---

### 7.2 Próximos Pasos Inmediatos

**Semana 1:**
1. [ ] Confirmar aprobación de esta propuesta con Matías y Dueño
2. [ ] Agendar entrevista profunda con Matías (Entrevista_Diagnostico.md)
3. [ ] Confirmar acceso a servidor con Daniel (informático)
4. [ ] Setup de ambiente de desarrollo local (Git, testing DB)

**Hito: Día 0 Oficial (Lanzamiento del Proyecto)**
- Especificaciones finales aprobadas
- Acceso confirmado
- Equipo (Tony + Robledo) alineado

---

### 7.3 Documentación Referencias

- 📋 [Entrevista_Diagnostico.md](Entrevista_Diagnostico.md) - Guía de entrevista con Matías
- 📊 [MINUTA_CONSOLIDADA.md](2026-04-12_Dom_MINUTA_CONSOLIDADA.md) - Contexto del proyecto

---

**Propuesta Preparada:** 12 de abril de 2026  
**Versión:** 0.1 (Borrador)  
**Estado:** Pendiente aprobación de Matías y Dueño (Daniel)

---

**Nota:** Este es un documento vivo. Se actualizará después de entrevista con Matías y confirmaciones finales.



Tiene n planes

Ejemplo plan 1, por numeros: terrenos terranova adelante

Ejemplo plan 2, por numeros: terrenos terranova atras

Ejemplo plan 3, por numeros: terrenos terranova otra parte

Ejemplo plan 4, por numeros: terrenos buen clima caro


Esta planificado por cada producto. El tipo se adiere el plan 22.

plan tiene dueño, unico dueño
y asi con departamentos y con todos. 

De esa manera estan identificados por numero y asi.

Despues se hace Cual es la adecion, que contiene el plan por aparte. El valor por metros cuadrados, No figura cuantos metros cuadrados compro. Dentro del sistema cuando se genera la cuenta, se van agregando a medida que vallan pagando. el cliente puede comprar mil metros si quiere.

En el resumen se pone el acumulado de tantos... metros cuadrados acumulados. en el recibo.

Resumen:
Un plan por cada producto
Planes tiene contrato de adecion, para definir el preboleto. y esto sya tiene definido el nuemero de contrato. por aparte se muestra que es lo que tiene el plan P22 por ejemplo. tendremos que contemplar que dentro del sistema si este predisponible este catalogo. 

Tiene vencimientos el pago por lotes, tiene unminimo de vencimiento. lo que no tiene es mora, por el momento. Genera mora durante el mes... DEJANDOLO CON MORA, por ejemplo mora cero y "a la mierda..."

mas de 3 se bloquea...

Necesito accesos con Daniel: 1234567890

Una vez que este en recibo ahora hay que ver, implementacion del logo en base de que empresa es... que se cargue el logo y todo... leyenda por 2 opciones. si cobramos como dice buen clima y listo... Esta.

Firma de contratos de adecion... autorizaciones previas... DEjandolo todo igual despues habilitamos funcionalidiades... lo mas sencillo posible...




No hay errores relevantes para esta funcion...


Hay una seccion de documentos donde se almacenan cualquier tipo de archivos...




---
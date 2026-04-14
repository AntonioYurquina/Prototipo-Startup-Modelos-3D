# 📋 ENTREVISTA DIAGNÓSTICO - SISTEMA BABA
## Funcionalidad: Venta por Metros Cuadrados

**Entrevistador:** Tony  
**Entrevistado:** Matías (Encargado Sucursal Capital)  
**Fecha:** [13/04/2026 9:00 hs]  
**Duración Estimada:** 90 minutos  (1+1/2 hs)
**Objetivo:** Comprender en detalle el sistema actual y validar la viabilidad de la nueva implementación

---

## 🎯 FOCOS PRINCIPALES DE LA ENTREVISTA

### Estructura: **Triángulo Invertido + Rombo**
- **Inicio (Apertura Amplia):** Preguntas generales sobre el sistema y negocio
- **Centro (Enfoque Profundo):** Detalles específicos del proceso de venta actual
- **Profundización (Rombo):** Exploración de escenarios con nueva funcionalidad
- **Cierre (Convergencia):** Confirmación de criterios y restricciones

---

## 📌 SECCIÓN 1: ENTENDIMIENTO DEL NEGOCIO ACTUAL

### **Bloque 1.1: Contexto General (SE LA PUEDE OBVIAR)**

**Preguntas Iniciales (Apertura):**

1. **¿Cuál es actualmente el modelo de venta en la sucursal capital?**
   - Respuesta esperada: Se venden lotes completos, no fraccionados
   - Profundizar en: ¿Hay excepciones históricas?
Hoy se venden por unidad, La idea es vender seleccionados de lotes por metros cuadrados
.


1. **¿Cuántos lotes aproximadamente se venden por mes?**
   - Registrar: Volumen de transacciones
   - Validar: Impacto de cambio

3. **¿Quiénes son los clientes principales? (Desarrolladores, particulares, empresas)**
   - Categorizar clientes
   - Entender si todos pueden comprar metros o solo algunos

4. **¿Existe algún competidor o sistema similar que haya visto vender por metros cuadrados?**
   - Benchmark
   - Validar viabilidad del modelo

---


Daniel esta trabajndo sobre el sistema de cajas...



### **Bloque 1.2: Proceso de Venta Actual (Profundización)**

5. **¿Cuál es el flujo completo de una venta desde el cliente contacta hasta que se registra en el sistema?**
   - Registrar cada paso
   - Identificar actores: vendedor, gerente, administrador, etc.
   - Tiempo promedio por transacción = 
    #### Diagrama de Flujo de Caja y Responsabilidades (SISTEMA ACTUAL)

	**1. ÁREA COMERCIAL (WhatsApp / Oficina)**
	- **Inicio:** El cliente consulta por un lote en cuotas.
		- ↓ Actividades Intermedias: 
	- **Gestión:** Se acuerda el monto de la seña o cuota mensual.
		- ↓ Actividades Intermedias: 
	- **Cobranza:** Recepción de valores (Efectivo/Transferencia).
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Emitir comprobante provisorio y derivar al cliente a Tesorería.
		- ↓ Actividades Intermedias: 
	
	**2. TESORERÍA Y ADMINISTRACIÓN (Control)**
	
	- **Validación:** Se confirma el ingreso en la cuenta bancaria de la S.R.L.
		- ↓ Actividades Intermedias: 
	- **Registro:** Se imputa el pago al **Legajo del Lote** (Ej: Manzana 285, Lote 10).
		- ↓ Actividades Intermedias: 
	- **Cierre Diario:** Se concilia el dinero físico contra los recibos emitidos.
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Custodia de valores y reporte de morosidad a Gerencia.
		- ↓ Actividades Intermedias: 
	
	**3. GERENCIA Y OBRA (Aplicación de Fondos)**
	
	- **Planificación:** Se detecta necesidad de materiales para cloacas o tendido eléctrico.
		- ↓ Actividades Intermedias: 
	- **Orden de Pago:** Gerencia autoriza la salida de fondos de la "Caja de Obra".
		- ↓ Actividades Intermedias: 
	- **Ejecución:** Se paga a proveedores o cuadrillas de infraestructura en Salta.
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Rendir facturas fiscales para cerrar el ciclo del gasto.
		- ↓ Actividades Intermedias: 

7. **¿De cuántos metros cuadrados son típicamente los lotes que se venden?**
   - Rango menor
   - Rango promedio
   - Rango máximo
   - Existe variabilidad importante = 

7. **¿En qué momento del proceso se registra la venta en el sistema BABA?**
   - ¿Antes de firmar documentos?
   - ¿Después?
   - ¿Hay registro manual en papel?

8. **¿Cómo se documentan actualmente las ventas?**
   - Comprobantes utilizados
   - Recibos, facturas
   - Registros que se generan

9. **¿Quién puede realizar una venta en el sistema? (Niveles de acceso)**
   - Roles de usuario
   - Permisos diferenciados
   - Control de cambios

---

### **Bloque 1.3: Datos y Registros Actuales**

10. **¿Qué información se captura de cada lote en el sistema?**
    - [ ] Identificador único
    - [ ] Ubicación/dirección
    - [ ] Metros cuadrados totales
    - [ ] Precio total
    - [ ] Precio por metro (si existe)
    - [ ] Documentación (escritura, planos)
    - [ ] Estado (disponible, vendido, etc.)
    - [ ] Otra: ___________

11. **¿Qué información se captura de cada cliente?**
    - [ ] Nombre completo
    - [ ] Documento de identidad
    - [ ] Teléfono/Email
    - [ ] Dirección
    - [ ] Referencias bancarias
    - [ ] Otra: ___________

12. **¿Hay reportes existentes que se generan actualmente?**
    - Tipos de reportes
    - Frecuencia (diario, semanal, mensual)
    - Destinatarios
    - Formatos (PDF, Excel, etc.)


---

## 📌 SECCIÓN 2: VALIDACIÓN DE LA NUEVA IMPLEMENTACIÓN

### **Bloque 2.1: Venta por Metros Cuadrados (Enfoque en Rombo)**

**Primer Nivel - Concepto:**

13. **¿Cómo funcionaría en la práctica la venta de solo parte de un lote (ej: 500 m² de 2000 m²)?**
    - Cédula de venta parcial
    - ¿El cliente compra "lote fraccionado" o "fracción de lote"?
    - Nombrado legal del documento

14. **¿Un mismo lote podría ser vendido a múltiples clientes en fraccionamientos diferentes?**
    - Ejemplo: Cliente A compra 500 m², Cliente B compra 1500 m²
    - ¿Se permite completar el lote con varios clientes?
    - Control visual del lote

**Segundo Nivel - Operativa:**

15. **¿Cómo se calcularía el precio en la nueva implementación?**
    - ¿Precio fijo por metro cuadrado?
    - ¿Hay descuentos por volumen (más metros = más descuento)?
    - ¿El precio varía por ubicación del lote?
    - Fórmula de cálculo: Precio total = Metros_solicitados × Precio/m²

16. **¿Habría restricciones en la cantidad mínima o máxima de metros a vender?**
    - Mínimo metros compra
    - Máximo metros disponibles
    - Fraccionamiento mínimo (ej: solo múltiplos de 100 m²)

17. **¿Qué pasa si quedan metros sin vender en un lote?**
    - Estado del lote parcialmente vendido
    - ¿Vuelve a disponibilidad o queda reservado?
    - Período de "espera"

**Tercer Nivel - Impacto:**

18. **¿Cómo esto afectaría los reportes actuales?**
    - Reportes de ventas por lote
    - Reportes de ingresos
    - Reportes de disponibilidad

19. **¿Habría cambios en la documentación legal?**
    - Nuevos comprobantes
    - Nuevas escrituras
    - Nuevos reportes para abogados/escribanías

---

### **Bloque 2.2: Restricciones y Consideraciones (Profundización)**

20. **¿Hay lotes que NO pueden ser fraccionados?**
    - Lotes protegidos por ley
    - Acuerdos especiales con clientes
    - Restricciones del terreno

21. **¿Cuántas fraccionamientos simultáneos se espera que un lote pueda tener?**
    - Complejo: muchas transacciones vs. simple: máximo 2-3

22. **¿Se requeriría aprobación antes de fraccionar un lote?**
    - ¿De quién? ¿Gerente? ¿Dueño?
    - ¿Hay validaciones o checklists previos?

---

## 📌 SECCIÓN 3: INTEGRACIÓN CON SISTEMA EXISTENTE

### **Bloque 3.1: Compatibilidad y Coexistencia**

23. **¿La venta por metros podría coexistir con la venta por lotes completos?**
    - ¿O todos los lotes deben cambiar al nuevo modelo?
    - Período de transición

24. **¿Hay datos históricos de ventas anteriores que se necesiten preservar o migrar?**
    - Volumen de datos
    - Formato actual
    - Validaciones necesarias

25. **¿Se requeriría mantener los precios históricos junto con los nuevos precios/metro?**
    - Auditoría histórica
    - Reporting comparativo

---

### **Bloque 3.2: Procesos Administrativos**

26. **¿Cómo se manejaría la tesorería/caja con pagos parciales?**
    - Pago completo del lote
    - Pagos en cuotas
    - Depósitos/Seña

27. **¿Quién autoriza una fraccionamiento? (Flujo de aprobación)**
    - [ ] Vendedor propone → Gerente aprueba
    - [ ] Vendedor propone → Dueño aprueba
    - [ ] Vendedor propone → Gerente → Dueño
    - Otro: ___________

28. **¿Hay límites de descuentos o flexibilidad de precio que el vendedor puede otorgar?**
    - Rango de variación permitida
    - Quien decide discounts > X%

---

## 📌 SECCIÓN 4: FLUJOS DE TRABAJO SUPUESTOS

### **Flujo 1: Venta Actual (ESTADO ACTUAL)**

```
INICIO
  ↓
Cliente consulta por lote específico
  ↓
Vendedor verifica disponibilidad en BABA
  ↓
¿Lote disponible?
  NO → Ofrecer alternativas → Fin
  SÍ → Negociar precio
  ↓
Aceptan precio
  ↓
Vendedor registra venta en BABA
  ↓
Sistema genera comprobante
  ↓
Envía a abogado/escribanía para documentación
  ↓
Cliente recibe escritura
  ↓
Fin
```

**Responsabilidades Actuales:**
- **Vendedor:** Consulta, negociación inicial, registro en BABA
- **Gerente:** Aprobación de descuentos
- **Sistema BABA:** Validar disponibilidad, generar comprobante
- **Abogado/Escribanía:** Documentación legal

---

### **Flujo 2: Venta por Metros (PROPUESTA - VALIDAR CON MATÍAS)**

```
INICIO
  ↓
Cliente consulta: "¿Cuánto cuesta 500 m² del lote X?"
  ↓
Vendedor verifica en BABA disponibilidad de metros
  ↓
Sistema calcula: 500 m² × $[precio/m²] = $[total]
  ↓
¿Cliente acepta?
  NO → Fin
  SÍ → ¿Requiere aprobación?
    SÍ → Gerente/Dueño revisa
    NO → Continuar
  ↓
Vendedor registra fraccionamiento en BABA
  ↓
Sistema:
  - Reserva 500 m² para este cliente
  - Genera comprobante de fracción
  - Actualiza disponibilidad del lote
  ↓
Envía a abogado para documento de fracción
  ↓
Cliente recibe escritura de fracción
  ↓
Lote actualiza estado: "XX% vendido, YY% disponible"
  ↓
¿Quedan metros?
  SÍ → Lote vuelve a disponibilidad
  NO → Lote marcado como VENDIDO COMPLETO
  ↓
Fin
```

**Responsabilidades Propuestas (VALIDAR):**
- **Vendedor:** Consulta, negociación, registro del fraccionamiento
- **Gerente:** Aprobación de fraccionamientos (si se requiere)
- **Sistema BABA:** Cálculo de precio, validación de disponibilidad, generación de comprobante, control de metros
- **Abogado/Escribanía:** Documentación de fracción
- **Dueño/Dirección:** Validación final de cambios de política

---

### **Responsabilidades Supuestas (COMPLETAR EN REUNIÓN)**

| Actividad | Responsable Actual | Responsable Propuesto | ¿Cambios? |
|-----------|-------------------|----------------------|-----------|
| Consulta de disponibilidad | Vendedor | Vendedor | ❓ |
| Cálculo de precio | Manual | BABA (automático) | ✅ NUEVO |
| Validación de fraccionamiento | N/A | ¿Gerente? ¿Dueño? | ❓ |
| Registro en sistema | Vendedor | Vendedor | ✅ (Más datos) |
| Generación de comprobante | BABA | BABA | ✅ (Nuevo formato) |
| Documentación legal | Abogado | Abogado | ✅ (Nuevo documento) |
| Control de metros restantes | N/A | BABA (automático) | ✅ NUEVO |
| Reporte de disponibilidad | Manual/Excel | BABA (automático) | ✅ NUEVO |

---

# Diagrama de Flujo de Caja y Responsabilidades (SISTEMA NUEVO)
**1. ÁREA COMERCIAL (WhatsApp / Oficina)**
	- **Inicio:** El cliente consulta por un lote en cuotas.
		- ↓ Actividades Intermedias: 
	- **Gestión:** Se acuerda el monto de la seña o cuota mensual.
		- ↓ Actividades Intermedias: 
	- **Cobranza:** Recepción de valores (Efectivo/Transferencia).
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Emitir comprobante provisorio y derivar al cliente a Tesorería.
		- ↓ Actividades Intermedias: 
	
**2. TESORERÍA Y ADMINISTRACIÓN (Control)**
	- **Validación:** Se confirma el ingreso en la cuenta bancaria de la S.R.L.
		- ↓ Actividades Intermedias: 
	- **Registro:** Se imputa el pago al **Legajo del Lote** (Ej: Manzana 285, Lote 10).
		- ↓ Actividades Intermedias: 
	- **Cierre Diario:** Se concilia el dinero físico contra los recibos emitidos.
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Custodia de valores y reporte de morosidad a Gerencia.
		- ↓ Actividades Intermedias: 

**3. GERENCIA Y OBRA (Aplicación de Fondos)**
	- **Planificación:** Se detecta necesidad de materiales para cloacas o tendido eléctrico.
		- ↓ Actividades Intermedias: 
	- **Orden de Pago:** Gerencia autoriza la salida de fondos de la "Caja de Obra".
		- ↓ Actividades Intermedias: 
	- **Ejecución:** Se paga a proveedores o cuadrillas de infraestructura en Salta.
		- ↓ Actividades Intermedias: 
	- **Responsabilidad:** Rendir facturas fiscales para cerrar el ciclo del gasto.
		- ↓ Actividades Intermedias: 

---
## 📌 SECCIÓN 5: PREGUNTAS DE CIERRE

### **Bloque 5.1: Validación General**

29. **De todo lo que hemos discutido, ¿hay algo que NO sea correcto o que requiera aclaración?**
    - Listado de cambios confirmados
    - Listado de dudas residuales

30. **¿Cuál sería el indicador de éxito de esta implementación?**
    - Mayor volumen de ventas
    - Mejor utilización de terreno
    - Mayor rapidez en el proceso
    - Otro: ___________

31. **¿Hay restricciones legales o contractuales que debemos conocer?**
    - Acuerdos con municipalidad
    - Acuerdos con clientes existentes
    - Regulaciones de divisionamiento

32. **¿En caso de que algo falle o haya un problema con la nueva implementación, cuál sería el plan de rollback?**
    - Volver al sistema antiguo
    - Período de prueba antes de cutover
    - Mantener ambos sistemas en paralelo

---

### **Bloque 5.2: Confirmación y Siguientes Pasos**

33. **¿Quién más de tu equipo debería estar en una siguiente reunión? (Escribanía, Legal, Finanzas)**
    - Nombres y roles
    - Temas específicos para cada uno

34. **¿Cuál es el timeline que tienes en mente para esta implementación?**
    - Inicio del proyecto
    - Fecha objetivo de go-live
    - Período de piloto

35. **¿Hay presupuesto asignado o aprobado para esta implementación?**
    - Hay presupuesto
    - Necesita aprobación del dueño
    - Restricciones financieras

---

## 📋 PREGUNTAS PARA EL INFORMÁTICO (DANIEL)

### 📌 INFRAESTRUCTURA Y ACCESO

1. **¿Cuál es la arquitectura actual del servidor BABA?**
   - Servidor único o distribuido
   - Balanceo de carga
   - Redundancia

2. **¿Cuál es el lenguaje de programación y framework del sistema BABA?**
   - Aunque no entraré en ello, necesito saberlo para contexto
   - Versiones específicas

3. **¿Acceso a ambiente de desarrollo, testing y producción?**
   - Credenciales para cada ambiente
   - Cómo se solicita acceso
   - Permisos necesarios

4. **¿Política de backups?**
   - Frecuencia de backups
   - Dónde se almacenan
   - Cómo recuperar datos

5. **¿Cuál es el horario de mantenimiento o ventanas de cambio?**
   - Horarios permitidos para desarrollo
   - Shutdown de servicios
   - Impacto en usuarios

### 📌 BASE DE DATOS

6. **Acceso a backup actual de db_sistema**
   - Para análisis local
   - Permiso para crear ambientes de prueba

7. **Documentación de estructura de base de datos**
   - Diagrama ER actual
   - Descripción de tablas principales
   - Relaciones y constraints

8. **Información sobre tablas críticas:**
   - Tabla de lotes (estructura, índices, volumen)
   - Tabla de ventas (estructura, volumen histórico)
   - Tabla de clientes (estructura, volumen)
   - Tabla de usuarios/permisos

### 📌 SEGURIDAD Y ACCESO REMOTO

9. **¿Se puede acceder al servidor desde fuera de la empresa?**
   - VPN requerida
   - Credenciales específicas
   - Restricciones de IP

10. **¿Hay logs de acceso que deba conocer?**
    - Dónde se registran cambios
    - Cómo auditar cambios en producción

### 📌 INTEGRACIONES Y DEPENDENCIAS

11. **¿El sistema BABA se integra con otros sistemas?**
    - Sistema contable
    - Sistema de facturación
    - Escribanía/Legal software
    - Otro

12. **¿Hay APIs externas consumidas?**
    - Servicios de mapas
    - Servicios de validación
    - Otra

### 📌 DOCUMENTACIÓN TÉCNICA

13. **¿Existe documentación técnica del sistema?**
    - Manual técnico
    - Diagrama de arquitectura
    - Guía de configuración

14. **¿Hay manual de usuario actual?**
    - Procesos documentados
    - Capturas de pantalla
    - Validaciones existentes

### 📌 CAMBIOS Y DEPLOYMENT

15. **¿Cuál es el proceso para hacer cambios en producción?**
    - Control de cambios
    - Sistema de versionamiento
    - Testing antes de producción
    - Rollback procedure

16. **¿Hay scripts de migración de datos disponibles?**
    - Cómo se migran datos nuevos
    - Validaciones de integridad

### 📌 MONITOREO Y SOPORTE

17. **¿Hay alertas o monitoreo en el servidor?**
    - Dónde se reportan errores
    - Cómo acceder a logs de error
    - Quién ve las alertas

18. **¿Hay SLA (acuerdo de nivel de servicio)?**
    - Uptime esperado
    - Tiempo de respuesta
    - Ventanas de mantenimiento

---

## 📝 NOTAS GENERALES

- Grabar la entrevista (con permiso) para referencia
- Tomar fotos de pantallas si es posible
- Solicitar documentación compartida después
- Agendar segunda sesión si es necesario
- Involucrar al dueño (Daniel) lo antes posible para validar

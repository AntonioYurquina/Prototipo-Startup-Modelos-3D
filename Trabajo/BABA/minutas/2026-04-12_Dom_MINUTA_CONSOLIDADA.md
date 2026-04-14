# 📋 MINUTA CONSOLIDADA - PROYECTO BABA

**Dom 12-04-26**

---

## 🎯 CONTEXTO

Se realizó un diagnóstico técnico integral del sistema de caja BABA de la empresa, con el objetivo de analizar y documentar su arquitectura técnica sin afectar el servidor de producción.

### Reunión con Informático de la Empresa

Se sostuvo una reunión con el informático de la empresa que cuenta con años de experiencia trabajando en la organización. Durante la misma se discutió:

**Información Proporcionada:**
- 📋 Se proporcionó documentación técnica del servidor con datos de acceso
- 🔒 **Servidor protegido por DNS** - Solo es accesible cuando está conectado al **WiFi de la empresa**
- ⏱️ **Timeline del Proyecto:** El desarrollo de la nueva aplicación demorará aproximadamente **1 año**
- 👨‍💻 **Rol del Informático:** Se encarga únicamente del **manejo de la red**, no del desarrollo de aplicaciones
- 🛠️ **Enfoque Tecnológico:** Utiliza **marcos de trabajo genéricos y planillados**, no frameworks específicos
- ⚠️ **Problema Identificado:** El servidor BABA podría no estar funcionando correctamente

**Acciones Acordadas:**
Tras comprender que el servidor estaba protegido por DNS y solo accesible desde la red interna de la empresa, se procedió a realizar el análisis del servidor con la documentación proporcionada.

**Datos documentados para el diagnóstico:**
- WEB: http://sysbabacaja.duckdns.org:8880/
- SSH: Puerto 622 (root/contraseña)
- FTP: Puerto 921 (ftpuser)
- MySQL: Puerto 5436 (base: db_sistema)

---

## � ALCANCE DE IMPLEMENTACIÓN Y EQUIPO DE TRABAJO

### Tareas Asignadas

El usuario (Tony) fue asignado a implementar una **modificación estratégica del negocio** junto a **Robledo** (persona de confianza seleccionada para este proyecto):

**Modificación de Negocio:**
- **Objetivo:** Cambiar el modelo de venta del sistema BABA
- **De:** Venta por lotes completos
- **A:** Venta por metros cuadrados
- **Enfoque:** Implementación mediante **parche de funcionalidad** sin comprometer el sistema actual

### Personas Involucradas

| Rol | Nombre | Responsabilidad | Coordinación |
|-----|--------|-----------------|--------------|
| **Encargado Sucursal Capital** | Matías | Definir requerimientos de negocio | ⚠️ Sin especificaciones detalladas aún |
| **Persona de Confianza** | Robledo | Trabajar conjuntamente con Tony | ✅ Asignado al proyecto |
| **Informático de Empresa** | Daniel | Manejo de red y servidor | ❌ Tarea separada - No coordina directamente |
| **Dueño de la Empresa** | Daniel | Aprobación de cambios | 📅 A conocer en próximas etapas |

### Estructura de Trabajo y Alcances Clarificados

**Importante:** Se estableció claramente que:

1. **Separación de Tareas:**
   - La creación del **nuevo sistema BABA** está a cargo del otro ingeniero (Daniel)
   - Tony y Robledo solo implementarán el **parche de funcionalidad** para la venta por metros cuadrados
   - **No se tumba el sistema antiguo** - Se trabaja en paralelo

2. **Independencia de Equipos:**
   - Tony no trabaja en conjunto con el informático (Daniel)
   - Daniel está encargado de otra tarea diferente
   - Tony respeta el trabajo de Daniel y no se mete en su terreno
   - Cada uno cobra según su responsabilidad (Daniel cobra más por la creación del sistema nuevo)

3. **Enfoque Profesional:**
   - Tony se compromete a hacer su trabajo de manera **profesional y meticulosa**
   - Esta es una oportunidad para escalar en la empresa como primer trabajo formal
   - El objetivo es implementar la funcionalidad sin arriesgar operaciones actuales

4. **Especificaciones Incompletas:**
   - Matías (encargado sucursal) no proporcionó especificaciones detalladas
   - Datos de negocio insuficientes para comenzar desarrollo
   - Se requieren entrevistas profundas con Matías antes de implementar

---

## �📊 ANÁLISIS

### 📄 Documentación Proporcionada por el Informático

El informático de la empresa proporcionó la siguiente documentación técnica del servidor BABA:

**Información de Acceso al Servidor:**

| Servicio | Detalles |
|----------|----------|
| **WEB** | http://sysbabacaja.duckdns.org:8880/ (Path: /var/www/babasyscaja/) |
| **SSH** | Puerto 622 - Usuario: root - Contraseña: QAZ**wsx** - OS: Ubuntu 22.04 |
| **FTP** | Host: sysbabacaja.duckdns.org - Puerto 921 - Usuario: ftpuser - Contraseña: QAZ**wsx** |
| **Base de Datos** | MariaDB en sysbabacaja.duckdns.org:5436 - Base: db_sistema - Usuario: baba |

**Notas Importantes:**
- ⚠️ Servidor protegido por **DNS dinámico** (duckdns.org)
- 🔐 Solo accesible desde el **wifi de la empresa**
- ⏳ Nuevo sistema se desarrollará en **~1 año**
- 🛠️ Infraestructura: Marcos de trabajo genéricos, sin frameworks específicos

---

### 🔧 Lo Que Procedimos a Hacer - 6 Experimentos de Diagnóstico

Con base en la documentación proporcionada, se realizaron 6 experimentos sistemáticos para validar el acceso al servidor BABA:

### **Experimentación 1: Resolución DNS**
```bash
# Verificar resolución de dominio
nslookup sysbabacaja.duckdns.org
dig sysbabacaja.duckdns.org
host sysbabacaja.duckdns.org
```

**Resultado:** ✅ El dominio `sysbabacaja.duckdns.org` resuelve correctamente a IP `181.199.159.95`

---

### **Experimentación 2: Prueba de Conectividad Básica**
```bash
# Verificar que el servidor es alcanzable
ping -c 4 sysbabacaja.duckdns.org
ping -c 4 181.199.159.95
```

**Resultado:** ✅ Servidor alcanzable - responde a ping correctamente. DNS y conectividad de red validadas.

---

### **Experimentación 3: Escaneo Completo de Puertos (nmap)**
```bash
sudo apt-get install nmap
nmap -p 22,80,443,622,921,5436,8880 sysbabacaja.duckdns.org
nmap -sV -p 22,80,443,622,921,5436,8880 sysbabacaja.duckdns.org
```

**Resultado:** ❌ Puertos especificados CERRADOS:
- Puerto 622 (SSH custom): CERRADO
- Puerto 8880 (WEB): CERRADO
- Puerto 921 (FTP): CERRADO
- Puerto 5436 (MySQL): CERRADO
- Puerto 22 (SSH estándar): CERRADO

✅ Puertos ABIERTOS:
- Puerto 80 (HTTP): ABIERTO
- Puerto 443 (HTTPS): ABIERTO

---

### **Experimentación 4: Verificación de Puertos con Netcat**
```bash
nc -zv -w 5 sysbabacaja.duckdns.org 622   # SSH custom
nc -zv -w 5 sysbabacaja.duckdns.org 8880  # WEB
nc -zv -w 5 sysbabacaja.duckdns.org 921   # FTP
nc -zv -w 5 sysbabacaja.duckdns.org 5436  # MySQL
nc -zv -w 5 sysbabacaja.duckdns.org 22    # SSH estándar
nc -zv -w 5 sysbabacaja.duckdns.org 80    # HTTP
nc -zv -w 5 sysbabacaja.duckdns.org 443   # HTTPS
```

**Resultado:** ❌ Confirmado - Todos los puertos especificados están CERRADOS. Los únicos puertos abiertos son 80 y 443.

---

### **Experimentación 5: Identificación del Servidor Web**
```bash
curl -I http://sysbabacaja.duckdns.org:80
curl -v http://sysbabacaja.duckdns.org:80
curl -I https://sysbabacaja.duckdns.org:443
```

**Resultado:** 🔍 Servidor identificado:
- Software: **Apache/2.4.52 (Ubuntu)**
- Aplicación ejecutando: **Moodle** (Plataforma Educativa)
- Headers revelados en respuesta HTTP
- Redirige a: `https://edu.safesa.gob.ar`

---

### **Experimentación 6: Análisis Profundo del Servidor**
```bash
telnet sysbabacaja.duckdns.org 80
# Luego: GET / HTTP/1.0 [Enter][Enter]

openssl s_client -connect sysbabacaja.duckdns.org:443
```

**Resultado:** ❌ **Hallazgo Crítico** - Este servidor NO ejecuta la aplicación BABA. Ejecuta Moodle, una plataforma educativa completamente diferente.

---

## 📊 CONCLUSIONES DEL ANÁLISIS

### 🔴 **Problema Crítico Identificado**

La documentación de acceso proporcionada es **INCOMPATIBLE CON LA REALIDAD ACTUAL DEL SERVIDOR**.

**Evidencia:**
- El dominio resuelve correctamente ✅
- El servidor es alcanzable ✅
- **PERO ejecuta Moodle, NO BABA** ❌
- Los puertos especificados están todos cerrados ❌
- Los datos de acceso son inválidos o desactualizados ❌

### 🚫 **Posibles Causas**

1. **Datos de acceso incorrectos o desactualizados** - La documentación es antigua
2. **Servidor reconfigurado** - El dominio apunta a una máquina diferente
3. **Falta de autorización** - No hay permisos para acceder a los puertos especificados
4. **Servidor trasladado** - BABA está en otra IP/dominio diferente

### 🟠 **Estado del Proyecto: BLOQUEADO**

Sin acceso correcto al servidor, código fuente o documentación, **NO es posible continuar con el análisis profundo** de la arquitectura técnica del sistema BABA.

### 📋 **Información Crítica Requerida para Desbloquear**

**Del Administrador/Equipo:**

**Acceso al Servidor:**
- [ ] Dirección IP/dominio **CORRECTO** del servidor BABA
- [ ] Puerto SSH válido y credenciales actuales
- [ ] Confirmación de autorización de acceso

**Código Fuente:**
- [ ] Repositorio Git con el código fuente
- [ ] O archivo comprimido (ZIP/TAR) con la aplicación
- [ ] Framework, lenguajes y dependencias utilizadas

**Base de Datos:**
- [ ] Backup actual de db_sistema
- [ ] Diagrama ER (si existe documentado)
- [ ] Documentación de tablas principales

**Información de Infraestructura:**
- [ ] Versiones de servicios (Apache, MariaDB, PHP)
- [ ] Configuración de servicios
- [ ] Variables de entorno y configuración

### ✅ **Recomendaciones Inmediatas**

1. **Verificar con administrador:** Confirmar IP/dominio correcto del servidor BABA
2. **Solicitar información:** Usar los puntos anteriores para obtener acceso real
3. **Actualizar documentación:** Cambiar y validar todas las credenciales
4. **Seguridad:** Una vez validado, cambiar credenciales por nuevas


---

## 🚀 PRÓXIMOS PASOS

### 📌 **Prioridad Inmediata: Entrevistas de Especificación**

**FASE 0 - Entrevistas Detalladas con Matías (CRÍTICO):**

Antes de comenzar cualquier desarrollo, se necesitan entrevistas profundas con **Matías** (encargado sucursal capital) para clarificar:

**Funcionalidad de Venta por Metros Cuadrados:**
- [ ] ¿Cuál es el precio por metro cuadrado?
- [ ] ¿Cómo se calcula la superficie total de cada lote?
- [ ] ¿Hay restricciones o mínimos de metros a vender?
- [ ] ¿Cómo se registra la fracción de metros en la base de datos?

**Integración con Sistema Actual:**
- [ ] ¿Qué módulos del sistema actual necesitan modificación?
- [ ] ¿Cómo impacta esto en reportes existentes?
- [ ] ¿Hay datos históricos que deben conservarse o migrarse?
- [ ] ¿El nuevo modelo coexiste con el modelo antiguo?

**Procesos Administrativos:**
- [ ] ¿Cómo se documenta la venta fraccionada?
- [ ] ¿Qué validaciones se necesitan en el sistema?
- [ ] ¿Hay cambios en el flujo de caja?
- [ ] ¿Se requieren cambios en reportes o comprobantes?

**Contacto con Dueño:**
- [ ] Presentación formal con Daniel (dueño)
- [ ] Confirmación de especificaciones con autoridad máxima
- [ ] Clarificación de timeline y presupuesto

**Restricciones Importantes:**
- ⚠️ **NO se tumbará el sistema actual**
- ⚠️ **Solo implementación de parche/módulo nuevo**
- ⚠️ **Garantizar estabilidad de operaciones actuales**
- ⚠️ **No interferir con trabajo del otro ingeniero**

---

### **FASE 1 - Análisis Técnico (Una vez se tengan especificaciones):**
1. Mapear la estructura actual de la base de datos
2. Diseñar nuevas tablas/campos para venta por metros
3. Crear documentación técnica de cambios
4. Validar impacto en sistema actual

### **FASE 2 - Diseño del Parche (Con Robledo):**
1. Diseñar arquitectura del módulo nuevo
2. Definir interfaces con sistema existente
3. Crear plan de integración sin afectar operaciones
4. Documentar puntos de extensibilidad

### **FASE 3 - Implementación (Con Robledo):**
1. Desarrollar funcionalidad de venta por metros cuadrados
2. Crear pruebas unitarias y de integración
3. Implementar en entorno de desarrollo/testing
4. Validación con Matías

### **FASE 4 - Deployment y Validación:**
1. Plan de rollout sin interrupciones
2. Rollback procedure si es necesario
3. Capacitación a usuarios finales
4. Soporte inicial post-implementación

---

## 📞 RESPONSABLE Y CONTACTO

### Equipo de Proyecto

| Rol | Nombre | Función |
|-----|--------|---------|
| **Implementador Principal** | Tony | Análisis y desarrollo del parche de venta por m² |
| **Compañero de Sistema** | Robledo | Implementación conjunta con Tony |
| **Contacto de Negocio** | Matías | Encargado sucursal capital - Requisitos operacionales |
| **Contacto Dueño** | Daniel | Dueño empresa - Aprobación final |
| **Infraestructura** | Daniel | Informático - Manejo de servidor y red (tarea separada) |

### Información del Proyecto

- **Proyecto:** Sistema BABA - Modificación de Modelo de Negocio (Venta por m²)
- **Período:** 11-12 de abril de 2026 (Fase de diagnóstico)
- **Objetivo Principal:** Implementar venta por metros cuadrados sin tumbar sistema actual
- **Enfoque:** Parche de funcionalidad / Módulo nuevo independiente
- **Estado Actual:** 📋 Esperando especificaciones detalladas de Matías
- **Primera Acción:** Entrevistas profundas con Matías para clarificar requerimientos

### Notas sobre Estructura de Trabajo

- Tony y Robledo trabajan conjuntamente en la implementación del parche
- Daniel (informático) trabaja en tarea separada (creación de nuevo sistema) - **Sin coordinación directa**
- Respeto total a las responsabilidades de cada equipo
- Enfoque profesional: "Hacer mi trabajo lo más profesional que pueda"
- Oportunidad de escalar en la empresa como primer proyecto formal

---

**Última actualización:** 12 de abril de 2026  
**Próxima revisión:** Después de entrevistas con Matías y confirmación con dueño  
**Minuta Consolidada - Proyecto BABA - Implementación Venta por Metros Cuadrados**

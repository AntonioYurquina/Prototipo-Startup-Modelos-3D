================================================================================
INFORME TECNICO - DIAGNOSTICO DE ACCESO
Aplicacion: BABA - Sistema de Caja
Fecha Diagnostico: 11 de abril de 2026
================================================================================

DATOS DOCUMENTADOS (Originales):
===============================

WEB:
    - http port: 8880
    - url: http://sysbabacaja.duckdns.org:8880/
    - Path local: /var/www/babasyscaja/

SSH: 
    - Puerto: 622
    - Usr: root
    - Pass: QAZ**wsx**
    - OS: UBUNTU 22.04

FTP: 
    - Host: sysbabacaja.duckdns.org
    - Puerto: 921
    - Usuario: ftpuser
    - Contraseña: QAZ**wsx**

MARIADB: 
    - Host: sysbabacaja.duckdns.org
    - Puerto: 5436
    - Base: db_sistema
    - Usuario: baba
    - Password: QAZ**wsx**


================================================================================
RESULTADOS DEL DIAGNOSTICO
================================================================================

CONECTIVIDAD:
✅ Servidor alcanzable en IP: 181.199.159.95
✅ DNS resuelve correctamente: sysbabacaja.duckdns.org → 181.199.159.95

PUERTOS ANALIZADOS:
❌ Puerto 622 (SSH):     CERRADO - No accesible
❌ Puerto 8880 (WEB):    CERRADO - No accesible
❌ Puerto 921 (FTP):     CERRADO - No accesible
❌ Puerto 5436 (MySQL):  CERRADO - No accesible
❌ Puerto 22 (SSH std):  CERRADO - No accesible
✅ Puerto 80 (HTTP):     ABIERTO
✅ Puerto 443 (HTTPS):   ABIERTO

SERVICIO DETECTADO:
- Servidor en puerto 80: Apache/2.4.52 (Ubuntu)
- Servicio identificado: Moodle (Plataforma Educativa)
- Redirige a: https://edu.safesa.gob.ar
- Conclusión: Este NO es el servidor de la aplicación BABA

================================================================================
PROBLEMA IDENTIFICADO
================================================================================

CAUSA POSIBLE:
1. Los datos de acceso en la documentación podrían ser INCORRECTOS o DESACTUALIZADOS
2. El dominio sysbabacaja.duckdns.org puede no corresponder al servidor BABA real
3. El servidor pudo haber sido reconfigurado o trasladado
4. Es posible que no tengas acceso autorizado a los puertos especificados

ACCIONES RECOMENDADAS:
========================

1. VERIFICAR CON TU ADMINISTRADOR:
   - Confirmación de IP/dominio correcto del servidor BABA
   - Puertos reales habilitados para acceso
   - Credenciales actualizadas
   - Confirmación de autorización de acceso

2. INFORMACIÓN A SOLICITAR:
   - ¿Cuál es la dirección IP o dominio correcto?
   - ¿En qué puertos están expuestos SSH, FTP y MySQL?
   - ¿Las credenciales siguen siendo válidas?
   - ¿Hay restricciones de firewall o IP?
   - ¿Se cambió la configuración recientemente?

3. ALTERNATIVAS:
   - Solicitar un backup actual de la base de datos
   - Solicitar código fuente de la aplicación
   - Solicitar máquina virtual o contenedor con el ambiente
   - Acceso a repositorio Git de la proyecto

================================================================================
STATUS DE ACCESO ACTUAL
================================================================================

ESTADO: ❌ NO ACCESIBLE
BLOQUEANTE: Documentación con datos incorrectos o desactualizados
PROXIMOS PASOS: Contactar administrador del proyecto para datos correctos

================================================================================

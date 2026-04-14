/**
 * UTILIDADES GENÉRICAS
 * Funciones auxiliares reutilizables en toda la aplicación
 */

/**
 * Validación de emails
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validación de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validación de URL
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Formatea número como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (USD, EUR, etc)
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Formatea fecha legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Locale (es-ES por defecto)
 * @returns {string}
 */
export const formatDate = (date, locale = 'es-ES') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

/**
 * Formatea fecha corta
 * @param {Date|string} date - Fecha a formatear
 * @returns {string}
 */
export const formatDateShort = (date) => {
  return new Intl.DateTimeFormat('es-ES').format(new Date(date));
};

/**
 * Trunca texto a longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitaliza primera letra
 * @param {string} text - Texto a capitalizar
 * @returns {string}
 */
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convierte texto a slug
 * @param {string} text - Texto a convertir
 * @returns {string}
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/\-+/g, '-')
    .trim('-');
};

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Descarga archivo desde URL
 * @param {string} url - URL del archivo
 * @param {string} filename - Nombre del archivo
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Debounce para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en ms
 * @returns {Function}
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Limit en ms
 * @returns {Function}
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Obtiene valor anidado de objeto
 * @param {Object} obj - Objeto
 * @param {string} path - Path con notación punto (ej: 'user.profile.name')
 * @param {*} defaultValue - Valor por defecto
 * @returns {*}
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  
  return result;
};

/**
 * Fusiona objetos profundamente
 * @param {Object} target - Objeto base
 * @param {Object} source - Objeto a fusionar
 * @returns {Object}
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
};

/**
 * Verifica si valor es objeto
 * @param {*} item - Item a verificar
 * @returns {boolean}
 */
export const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Genera ID único
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Verifica si array está vacío
 * @param {Array} arr - Array a verificar
 * @returns {boolean}
 */
export const isEmpty = (arr) => {
  return !arr || arr.length === 0;
};

/**
 * Remueve duplicados de array
 * @param {Array} arr - Array original
 * @param {string} key - Key para comparar (opcional)
 * @returns {Array}
 */
export const removeDuplicates = (arr, key = null) => {
  if (!key) return [...new Set(arr)];
  
  const seen = new Map();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.set(value, true);
    return true;
  });
};

/**
 * Agrupa array por propiedad
 * @param {Array} arr - Array a agrupar
 * @param {string} key - Key para agrupar
 * @returns {Object}
 */
export const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Ordena array
 * @param {Array} arr - Array a ordenar
 * @param {string} key - Key para ordenar
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array}
 */
export const sortBy = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filtra array por múltiples criterios
 * @param {Array} arr - Array a filtrar
 * @param {Object} criteria - Criterios {key: value}
 * @returns {Array}
 */
export const filterByCriteria = (arr, criteria) => {
  return arr.filter(item =>
    Object.keys(criteria).every(key => item[key] === criteria[key])
  );
};

/**
 * Crea nueva instancia sin referenciar original (shallow copy)
 * @param {*} obj - Objeto a copiar
 * @returns {*}
 */
export const shallowClone = (obj) => {
  if (Array.isArray(obj)) return [...obj];
  if (isObject(obj)) return { ...obj };
  return obj;
};

/**
 * Espera X milisegundos
 * @param {number} ms - Milisegundos
 * @returns {Promise}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Reintenta función con backoff exponencial
 * @param {Function} fn - Función a ejecutar
 * @param {number} maxRetries - Máximo de intentos
 * @param {number} delay - Delay inicial
 * @returns {Promise}
 */
export const retry = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }
};

/**
 * Calcula estadísticas básicas
 * @param {Array<number>} numbers - Array de números
 * @returns {Object} {min, max, avg, sum, count}
 */
export const calculateStats = (numbers) => {
  if (numbers.length === 0) return null;
  
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    avg: sum / numbers.length,
    sum,
    count: numbers.length
  };
};

export default {
  validateEmail,
  validatePhone,
  validateURL,
  formatCurrency,
  formatDate,
  formatDateShort,
  truncateText,
  capitalize,
  slugify,
  copyToClipboard,
  downloadFile,
  debounce,
  throttle,
  getNestedValue,
  deepMerge,
  isObject,
  generateId,
  isEmpty,
  removeDuplicates,
  groupBy,
  sortBy,
  filterByCriteria,
  shallowClone,
  sleep,
  retry,
  calculateStats
};

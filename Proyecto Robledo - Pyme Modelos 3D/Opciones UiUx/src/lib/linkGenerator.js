/**
 * GENERADOR DE LINKS TEMPORALES
 * Crea links con vencimiento temporal (24-48 horas)
 */

/**
 * Genera un link temporal con expiración
 * @param {number} modelId - ID del modelo
 * @param {number} expirationHours - Horas de validez (default: 24)
 * @returns {Object} {link, expiresAt, isExpired}
 */
export const generateTemporaryLink = (modelId, expirationHours = 24) => {
  const baseUrl = 'https://modelo.robledo.com'
  const token = generateToken()
  const createdAt = new Date()
  const expiresAt = new Date(createdAt.getTime() + expirationHours * 60 * 60 * 1000)

  const link = `${baseUrl}/${modelId}/download/${token}`

  return {
    id: `link-${modelId}-${Date.now()}`,
    modelId,
    token,
    link,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    expirationHours,
    isExpired: false,
    downloadCount: 0,
    maxDownloads: 1 // Limit de descargas por link
  }
}

/**
 * Verifica si un link está expirado
 * @param {Object} linkData - Objeto del link
 * @returns {boolean}
 */
export const isLinkExpired = (linkData) => {
  const now = new Date()
  const expiresAt = new Date(linkData.expiresAt)
  return now > expiresAt || linkData.downloadCount >= linkData.maxDownloads
}

/**
 * Obtiene tiempo restante de un link
 * @param {Object} linkData - Objeto del link
 * @returns {string} Tiempo formateado (ej: "12 horas 30 minutos")
 */
export const getTimeRemaining = (linkData) => {
  const now = new Date()
  const expiresAt = new Date(linkData.expiresAt)
  const diff = expiresAt - now

  if (diff <= 0) return 'Expirado'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

/**
 * Genera un token aleatorio para el link
 * @returns {string}
 */
const generateToken = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

/**
 * Decodifica un token para extraer modelId
 * @param {string} token - Token del link
 * @returns {number} modelId
 */
export const extractModelIdFromToken = (token) => {
  // Implementar lógica de decodificación si es necesario
  return parseInt(token.split('-')[0]) || null
}

export default {
  generateTemporaryLink,
  isLinkExpired,
  getTimeRemaining,
  generateToken,
  extractModelIdFromToken
}

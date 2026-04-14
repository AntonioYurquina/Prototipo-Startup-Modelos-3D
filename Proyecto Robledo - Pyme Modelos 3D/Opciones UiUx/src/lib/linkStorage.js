/**
 * ADMINISTRADOR DE LINKS GENERADOS
 * Persiste y recupera links temporales
 */

const STORAGE_KEY = 'robledo_temp_links'

/**
 * Guarda un link temporal en storage
 * @param {Object} linkData - Datos del link
 */
export const saveLinkToStorage = (linkData) => {
  try {
    const links = getAllLinks()
    const existingIndex = links.findIndex(l => l.id === linkData.id)

    if (existingIndex >= 0) {
      links[existingIndex] = linkData
    } else {
      links.push(linkData)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
    return true
  } catch (error) {
    console.error('Error saving link:', error)
    return false
  }
}

/**
 * Obtiene todos los links almacenados
 * @returns {Array}
 */
export const getAllLinks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error retrieving links:', error)
    return []
  }
}

/**
 * Obtiene links de un modelo específico
 * @param {number} modelId
 * @returns {Array}
 */
export const getLinksByModel = (modelId) => {
  const allLinks = getAllLinks()
  return allLinks.filter(link => link.modelId === modelId)
}

/**
 * Obtiene el link vigente más reciente de un modelo
 * @param {number} modelId
 * @returns {Object|null}
 */
export const getLatestValidLink = (modelId) => {
  const { isLinkExpired } = require('./linkGenerator')
  const links = getLinksByModel(modelId)
    .filter(link => !isLinkExpired(link))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return links.length > 0 ? links[0] : null
}

/**
 * Elimina un link específico
 * @param {string} linkId
 */
export const deleteLink = (linkId) => {
  try {
    let links = getAllLinks()
    links = links.filter(l => l.id !== linkId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
    return true
  } catch (error) {
    console.error('Error deleting link:', error)
    return false
  }
}

/**
 * Limpia links expirados
 */
export const cleanupExpiredLinks = () => {
  try {
    const { isLinkExpired } = require('./linkGenerator')
    let links = getAllLinks()
    const beforeCount = links.length

    links = links.filter(link => !isLinkExpired(link))

    if (links.length < beforeCount) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
      return beforeCount - links.length // Retorna cantidad eliminada
    }
    return 0
  } catch (error) {
    console.error('Error cleaning up links:', error)
    return 0
  }
}

/**
 * Incrementa contador de descargas de un link
 * @param {string} linkId
 */
export const incrementDownloadCount = (linkId) => {
  try {
    const links = getAllLinks()
    const linkIndex = links.findIndex(l => l.id === linkId)

    if (linkIndex >= 0) {
      links[linkIndex].downloadCount += 1
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
      return true
    }
    return false
  } catch (error) {
    console.error('Error incrementing download count:', error)
    return false
  }
}

export default {
  saveLinkToStorage,
  getAllLinks,
  getLinksByModel,
  getLatestValidLink,
  deleteLink,
  cleanupExpiredLinks,
  incrementDownloadCount
}

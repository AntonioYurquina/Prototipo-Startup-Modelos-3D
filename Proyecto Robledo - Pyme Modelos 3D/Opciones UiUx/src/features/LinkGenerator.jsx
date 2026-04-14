import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { generateTemporaryLink, getTimeRemaining, isLinkExpired } from '../lib/linkGenerator'
import { saveLinkToStorage, getLinksByModel } from '../lib/linkStorage'
import '../styles/LinkGenerator.css'

/**
 * COMPONENTE - Link Generator
 * Genera links temporales con vencimiento para modelos
 */
const LinkGenerator = React.memo(({ model, isDarkMode, onLinkGenerated }) => {
  const [expirationHours, setExpirationHours] = useState(24)
  const [generatedLinks, setGeneratedLinks] = useState([])
  const [showLinks, setShowLinks] = useState(false)
  const [copied, setCopied] = useState(null)

  React.useEffect(() => {
    if (model?.id) {
      const links = getLinksByModel(model.id)
      setGeneratedLinks(links)
    }
  }, [model?.id])

  const handleGenerateLink = () => {
    if (!model?.id) return

    const newLink = generateTemporaryLink(model.id, expirationHours)
    saveLinkToStorage(newLink)
    setGeneratedLinks(prev => [newLink, ...prev])

    if (onLinkGenerated) {
      onLinkGenerated(newLink)
    }
  }

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link.link)
    setCopied(link.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const validLinks = generatedLinks.filter(link => !isLinkExpired(link))

  return (
    <div className={`link-generator ${isDarkMode ? 'dark' : 'light'}`}>
      <h3>🔗 Generador de Links Temporales</h3>

      {/* Generador */}
      <div className="generator-box">
        <div className="form-group">
          <label>Validez del Link:</label>
          <select 
            value={expirationHours} 
            onChange={(e) => setExpirationHours(Number(e.target.value))}
          >
            <option value={1}>1 Hora</option>
            <option value={6}>6 Horas</option>
            <option value={12}>12 Horas</option>
            <option value={24}>24 Horas</option>
            <option value={48}>48 Horas</option>
          </select>
        </div>

        <button 
          className="btn-generate"
          onClick={handleGenerateLink}
          disabled={!model?.id}
        >
          ✨ Generar Link
        </button>
      </div>

      {/* Links Válidos */}
      {validLinks.length > 0 && (
        <div className="valid-links">
          <button 
            className="toggle-links"
            onClick={() => setShowLinks(!showLinks)}
          >
            📋 Links Válidos ({validLinks.length})
          </button>

          {showLinks && (
            <div className="links-list">
              {validLinks.map(link => (
                <div key={link.id} className="link-item">
                  <div className="link-info">
                    <p className="link-url">{link.link}</p>
                    <p className="link-meta">
                      ⏰ Vence en: <strong>{getTimeRemaining(link)}</strong>
                      {' | '}
                      📥 {link.downloadCount}/{link.maxDownloads} descargas
                    </p>
                  </div>

                  <button 
                    className={`btn-copy ${copied === link.id ? 'copied' : ''}`}
                    onClick={() => handleCopyLink(link)}
                  >
                    {copied === link.id ? '✅ Copiado' : '📋 Copiar'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sin Links */}
      {validLinks.length === 0 && generatedLinks.length > 0 && (
        <p className="no-valid">✋ Todos los links han expirado</p>
      )}
    </div>
  )
})

LinkGenerator.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.number
  }),
  isDarkMode: PropTypes.bool.isRequired,
  onLinkGenerated: PropTypes.func
}

LinkGenerator.displayName = 'LinkGenerator'

export default LinkGenerator

const numberFormat = new Intl.NumberFormat('es-AR')
const percentFormat = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const dateTimeFormat = new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' })

export const formatUsd = (value) => `USD ${numberFormat.format(value)}`
export const formatNumber = (value) => numberFormat.format(value)
export const formatPercent = (value) => `${percentFormat.format(value)}%`
export const formatDateTime = (iso) => dateTimeFormat.format(new Date(iso))

export const shortId = (id) => id.replace(/^sale-/, '').slice(0, 8).toUpperCase()

export const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

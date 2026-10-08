import cafeLoftArt from './assets/models/cafe-loft.svg'
import droneRacerArt from './assets/models/drone-racer.svg'
import urbanPropsArt from './assets/models/urban-props.svg'

export const FORMATS = ['.obj', '.stl', '.fbx']

export const SORT_OPTIONS = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'nombre', label: 'Nombre (A-Z)' },
]

export const seedModels = [
  {
    id: 'mdl-001',
    nombrePublicado: 'Cafe Loft Interior Kit',
    formato: '.obj',
    zipName: 'cafe-loft-pack-v1.zip',
    filePath: '/simulado/storage/cafe-loft-pack-v1.zip',
    price: 49,
    categoria: 'Interiores',
    descripcion: 'Cafetería estilo loft lista para escenas de arquitectura y juegos: barra, taburetes, luminarias y utilería.',
    images: [{ id: 'img-001-1', modelId: 'mdl-001', url: cafeLoftArt }],
  },
  {
    id: 'mdl-002',
    nombrePublicado: 'Drone Racer Concept',
    formato: '.stl',
    zipName: 'drone-racer-concept.zip',
    filePath: '/simulado/storage/drone-racer-concept.zip',
    price: 79,
    categoria: 'Vehículos',
    descripcion: 'Dron de carrera de cuatro rotores, pensado para impresión 3D y renders conceptuales.',
    images: [{ id: 'img-002-1', modelId: 'mdl-002', url: droneRacerArt }],
  },
  {
    id: 'mdl-003',
    nombrePublicado: 'Urban Props Starter Pack',
    formato: '.fbx',
    zipName: 'urban-props-starter.zip',
    filePath: '/simulado/storage/urban-props-starter.zip',
    price: 39,
    categoria: 'Props urbanos',
    descripcion: 'Cajones, tachos, hidrante, banco, conos y farola para ambientar calles y escenarios urbanos.',
    images: [{ id: 'img-003-1', modelId: 'mdl-003', url: urbanPropsArt }],
  },
]

export const emptyModelForm = {
  nombrePublicado: '',
  formato: '.obj',
  zipName: '',
  filePath: '',
  price: '59',
  imagesRaw: '',
}

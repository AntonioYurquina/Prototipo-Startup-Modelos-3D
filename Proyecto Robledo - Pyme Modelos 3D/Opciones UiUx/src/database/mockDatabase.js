/**
 * MOCK DATABASE - Simulación de Base de Datos
 * Esta es una capa de datos simulada que demostraría cómo se integraría con una API real
 */

// Almacenamiento en memoria (simulando localStorage/API)
let store = {
  models: [],
  sales: [],
  customers: [],
  categories: [],
  users: []
};

/**
 * INICIALIZACIÓN DE DATOS
 * Datos demo para la pyme de modelos 3D
 */
export const initializeMockDatabase = () => {
  // Modelos 3D precargados
  store.models = [
    {
      id: 1,
      name: 'Sillón Moderno',
      description: 'Sillón de diseño low-poly para e-commerce',
      category: 'muebles-sala',
      fileName: 'sillon-moderno.glb',
      fileFormat: 'glb',
      fileSize: 2.5, // MB
      status: 'published',
      link: 'https://modelo.robledo.com/1-sillon-moderno',
      thumbnailUrl: '/assets/thumbnails/sillon-moderno.jpg',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-02-20').toISOString(),
      downloads: 45,
      sales: 12
    },
    {
      id: 2,
      name: 'Mesa Minimalista',
      description: 'Mesa redonda estilo nórdico',
      category: 'muebles-comedor',
      fileName: 'mesa-minimalista.obj',
      fileFormat: 'obj',
      fileSize: 1.8,
      status: 'draft',
      link: null,
      thumbnailUrl: '/assets/thumbnails/mesa-minimalista.jpg',
      createdAt: new Date('2024-02-10').toISOString(),
      updatedAt: new Date('2024-02-10').toISOString(),
      downloads: 0,
      sales: 0
    },
    {
      id: 3,
      name: 'Lámpara Diseño',
      description: 'Lámpara de piso moderna con materialización',
      category: 'iluminacion',
      fileName: 'lampara-diseno.gltf',
      fileFormat: 'gltf',
      fileSize: 3.2,
      status: 'published',
      link: 'https://modelo.robledo.com/3-lampara-diseno',
      thumbnailUrl: '/assets/thumbnails/lampara-diseno.jpg',
      createdAt: new Date('2024-01-20').toISOString(),
      updatedAt: new Date('2024-02-25').toISOString(),
      downloads: 32,
      sales: 8
    },
    {
      id: 4,
      name: 'Silla Ergonómica',
      description: 'Silla de oficina con respaldo ajustable y soporte lumbar',
      category: 'muebles-oficina',
      fileName: 'silla-ergonomica.glb',
      fileFormat: 'glb',
      fileSize: 2.1,
      status: 'published',
      link: 'https://modelo.robledo.com/4-silla-ergonomica',
      thumbnailUrl: '/assets/thumbnails/silla-ergonomica.jpg',
      createdAt: new Date('2024-01-25').toISOString(),
      updatedAt: new Date('2024-03-01').toISOString(),
      downloads: 58,
      sales: 18
    }
  ];

  // Categorías
  store.categories = [
    { id: 1, name: 'Muebles de Sala', slug: 'muebles-sala', icon: '🛋️' },
    { id: 2, name: 'Muebles de Comedor', slug: 'muebles-comedor', icon: '🍽️' },
    { id: 3, name: 'Muebles de Oficina', slug: 'muebles-oficina', icon: '💼' },
    { id: 4, name: 'Iluminación', slug: 'iluminacion', icon: '💡' },
    { id: 5, name: 'Accesorios', slug: 'accesorios', icon: '🎨' }
  ];

  // Clientes
  store.customers = [
    {
      id: 1,
      name: 'Juan Pérez García',
      email: 'juan@example.com',
      phone: '+34 912 345 678',
      company: 'Retail Solutions S.L.',
      city: 'Madrid',
      country: 'España',
      registeredAt: new Date('2024-01-10').toISOString(),
      totalPurchases: 5,
      totalSpent: 2500.00
    },
    {
      id: 2,
      name: 'María García López',
      email: 'maria@example.com',
      phone: '+34 934 567 890',
      company: 'Design Hub Barcelona',
      city: 'Barcelona',
      country: 'España',
      registeredAt: new Date('2024-01-15').toISOString(),
      totalPurchases: 3,
      totalSpent: 1800.00
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      phone: '+34 958 123 456',
      company: 'Muebles Granada S.L.',
      city: 'Granada',
      country: 'España',
      registeredAt: new Date('2024-02-01').toISOString(),
      totalPurchases: 8,
      totalSpent: 4200.00
    }
  ];

  // Ventas
  store.sales = [
    {
      id: 'VENTA-001',
      customerId: 1,
      modelId: 1,
      quantity: 5,
      unitPrice: 350.00,
      totalPrice: 1750.00,
      status: 'completed',
      date: new Date('2024-02-15').toISOString(),
      notes: 'Entrega en dos partes'
    },
    {
      id: 'VENTA-002',
      customerId: 2,
      modelId: 3,
      quantity: 2,
      unitPrice: 450.00,
      totalPrice: 900.00,
      status: 'completed',
      date: new Date('2024-02-20').toISOString(),
      notes: 'Cliente VIP'
    },
    {
      id: 'VENTA-003',
      customerId: 3,
      modelId: 4,
      quantity: 10,
      unitPrice: 400.00,
      totalPrice: 4000.00,
      status: 'pending',
      date: new Date('2024-03-01').toISOString(),
      notes: 'Pedido mayorista'
    }
  ];

  // Usuario demo
  store.users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@robledo.com',
      role: 'admin',
      createdAt: new Date('2024-01-01').toISOString()
    }
  ];
};

/**
 * OPERACIONES CRUD - MODELOS
 */
export const ModelService = {
  // Obtener todos los modelos
  getAll: () => Promise.resolve([...store.models]),

  // Obtener modelo por ID
  getById: (id) => {
    const model = store.models.find(m => m.id === id);
    return Promise.resolve(model || null);
  },

  // Crear nuevo modelo
  create: (modelData) => {
    const newModel = {
      id: Math.max(...store.models.map(m => m.id), 0) + 1,
      ...modelData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloads: 0,
      sales: 0
    };
    store.models.push(newModel);
    return Promise.resolve(newModel);
  },

  // Actualizar modelo
  update: (id, updates) => {
    const index = store.models.findIndex(m => m.id === id);
    if (index === -1) return Promise.reject(new Error('Modelo no encontrado'));
    
    store.models[index] = {
      ...store.models[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return Promise.resolve(store.models[index]);
  },

  // Eliminar modelo
  delete: (id) => {
    store.models = store.models.filter(m => m.id !== id);
    return Promise.resolve(true);
  },

  // Buscar por nombre o descripción
  search: (term) => {
    const results = store.models.filter(m =>
      m.name.toLowerCase().includes(term.toLowerCase()) ||
      m.description.toLowerCase().includes(term.toLowerCase())
    );
    return Promise.resolve(results);
  },

  // Filtrar por categoría
  getByCategory: (categorySlug) => {
    const results = store.models.filter(m => m.category === categorySlug);
    return Promise.resolve(results);
  },

  // Obtener modelos publicados
  getPublished: () => {
    const results = store.models.filter(m => m.status === 'published');
    return Promise.resolve(results);
  }
};

/**
 * OPERACIONES CRUD - VENTAS
 */
export const SalesService = {
  // Obtener todas las ventas
  getAll: () => Promise.resolve([...store.sales]),

  // Obtener venta por ID
  getById: (id) => {
    const sale = store.sales.find(s => s.id === id);
    return Promise.resolve(sale || null);
  },

  // Crear venta
  create: (saleData) => {
    const newSale = {
      id: `VENTA-${String(store.sales.length + 1).padStart(3, '0')}`,
      ...saleData,
      date: new Date().toISOString(),
      status: 'pending'
    };
    store.sales.push(newSale);
    return Promise.resolve(newSale);
  },

  // Actualizar venta
  update: (id, updates) => {
    const index = store.sales.findIndex(s => s.id === id);
    if (index === -1) return Promise.reject(new Error('Venta no encontrada'));
    
    store.sales[index] = { ...store.sales[index], ...updates };
    return Promise.resolve(store.sales[index]);
  },

  // Obtener ventas por cliente
  getByCusomer: (customerId) => {
    const results = store.sales.filter(s => s.customerId === customerId);
    return Promise.resolve(results);
  },

  // Obtener ventas por modelo
  getByModel: (modelId) => {
    const results = store.sales.filter(s => s.modelId === modelId);
    return Promise.resolve(results);
  },

  // Estadísticas de ventas
  getStats: () => {
    const totalSales = store.sales.reduce((sum, s) => sum + s.totalPrice, 0);
    const totalQuantity = store.sales.reduce((sum, s) => sum + s.quantity, 0);
    const completedSales = store.sales.filter(s => s.status === 'completed').length;

    return Promise.resolve({
      totalSales,
      totalQuantity,
      completedSales,
      pendingSales: store.sales.filter(s => s.status === 'pending').length,
      averageSale: totalSales / store.sales.length || 0
    });
  }
};

/**
 * OPERACIONES CRUD - CLIENTES
 */
export const CustomerService = {
  // Obtener todos los clientes
  getAll: () => Promise.resolve([...store.customers]),

  // Obtener cliente por ID
  getById: (id) => {
    const customer = store.customers.find(c => c.id === id);
    return Promise.resolve(customer || null);
  },

  // Crear cliente
  create: (customerData) => {
    const newCustomer = {
      id: Math.max(...store.customers.map(c => c.id), 0) + 1,
      ...customerData,
      registeredAt: new Date().toISOString(),
      totalPurchases: 0,
      totalSpent: 0
    };
    store.customers.push(newCustomer);
    return Promise.resolve(newCustomer);
  },

  // Actualizar cliente
  update: (id, updates) => {
    const index = store.customers.findIndex(c => c.id === id);
    if (index === -1) return Promise.reject(new Error('Cliente no encontrado'));
    
    store.customers[index] = { ...store.customers[index], ...updates };
    return Promise.resolve(store.customers[index]);
  },

  // Buscar por nombre o email
  search: (term) => {
    const results = store.customers.filter(c =>
      c.name.toLowerCase().includes(term.toLowerCase()) ||
      c.email.toLowerCase().includes(term.toLowerCase())
    );
    return Promise.resolve(results);
  }
};

/**
 * OPERACIONES - CATEGORÍAS
 */
export const CategoryService = {
  getAll: () => Promise.resolve([...store.categories]),
  getById: (id) => {
    const category = store.categories.find(c => c.id === id);
    return Promise.resolve(category || null);
  }
};

// Inicializar BD al importar
initializeMockDatabase();

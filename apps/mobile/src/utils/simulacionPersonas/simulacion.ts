import { Barbero, Mecanico, Manicurista, Servicio } from "@packages/types";

export const barberos: Barbero[] = [
  {
    id: 1,
    nombre: "Matías Almeyda",
    rating: 4.8,
    especialidad: "Cortes clásicos",
    imagenPerfil:
      "https://6185299abe.cbaul-cdnwnd.com/f36604d8ef17e3af8f2eb2d31f1a3f9f/200000075-05aca05acd/a9409281fa230ecd40b7f6e5f0594159.jpg?ph=6185299abe",
    imagenPrincipal:
      "https://media.gq.com.mx/photos/616de175f3d2ed61e46cb01f/4:3/w_2668,h_2001,c_limit/como-encontrar-identificar-debe-comportarse-un-buen-barbero-consejos.jpg",
    precioDesde: "$15.000",
    duracion: "30-45 min",
    disponibilidad: "Lun - Vie, 9:00-18:00",
  },
  {
    id: 2,
    nombre: "Carlos Vidal",
    rating: 4.6,
    especialidad: "Cortes degradados",
    imagenPerfil:
      "https://6185299abe.cbaul-cdnwnd.com/f36604d8ef17e3af8f2eb2d31f1a3f9f/200000075-05aca05acd/a9409281fa230ecd40b7f6e5f0594159.jpg?ph=6185299abe",
    imagenPrincipal:
      "https://media.istockphoto.com/id/1973194125/es/foto/peluquero-que-da-forma-a-las-cejas-del-cliente-del-hombre-usando-la-maquinilla-de-afeitar-en.jpg?s=612x612&w=0&k=20&c=il7pTFcu-UQektvG-TS-_VlKfniY_m4r9zcmIgjRq-U=",
    precioDesde: "$18.000",
    duracion: "45-60 min",
    disponibilidad: "Mar - Sáb, 10:00-19:00",
  },
    {
    id: 3,
    nombre: "Cristian San Mentiras",
    rating: 4.6,
    especialidad: "Cortes degradados",
    imagenPerfil:
      "https://6185299abe.cbaul-cdnwnd.com/f36604d8ef17e3af8f2eb2d31f1a3f9f/200000075-05aca05acd/a9409281fa230ecd40b7f6e5f0594159.jpg?ph=6185299abe",
    imagenPrincipal:
      "https://www.shutterstock.com/image-photo/barber-shop-barbers-working-on-260nw-1745065586.jpg",
    precioDesde: "$18.000",
    duracion: "45-60 min",
    disponibilidad: "Mar - Sáb, 10:00-19:00",
  },
];

export const manicuristas: Manicurista[] = [
  {
    id: 1,
    nombre: "Patricia González",
    rating: 4.9,
    especialidad: "Uñas acrílicas",
    imagenPerfil: "https://images.unsplash.com/photo-1494790108755-2616c6a3c8e0?w=150&h=150&fit=crop&crop=face",
    imagenPrincipal: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    precioDesde: "$12.000",
    disponibilidad: "Lun - Sáb, 9:00-17:00",
    ubicacion: "Mall Plaza Vespucio",
    telefono: "+56 9 5555 1234",
    experiencia: "10 años",
    servicios: [
      { id: 10, nombre: "Manicure básica", precio: "$12.000", duracion: "45 min", descripcion: "Limado, cutícula y esmaltado" },
      { id: 11, nombre: "Uñas acrílicas", precio: "$25.000", duracion: "90 min", descripcion: "Extensión con acrílico y decorado" },
      { id: 12, nombre: "Nail art", precio: "$18.000", duracion: "60 min", descripcion: "Diseños artísticos en uñas" }
    ]
  },
  {
    id: 2,
    nombre: "María José Silva",
    rating: 4.7,
    especialidad: "Nail art",
    imagenPerfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    imagenPrincipal: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=300&fit=crop",
    precioDesde: "$15.000",
    disponibilidad: "Mar - Dom, 10:00-18:00",
    ubicacion: "Av. Apoquindo 3000, Las Condes",
    telefono: "+56 9 7777 8888",
    experiencia: "7 años",
    servicios: [
      { id: 13, nombre: "Pedicure spa", precio: "$15.000", duracion: "60 min", descripcion: "Tratamiento completo de pies" },
      { id: 14, nombre: "Uñas gel", precio: "$20.000", duracion: "75 min", descripcion: "Esmaltado semipermanente" },
      { id: 15, nombre: "Decoración francesa", precio: "$16.000", duracion: "50 min", descripcion: "Manicure francesa clásica" }
    ]
  }
];

export const mecanicos: Mecanico[] = [
  {
    id: 1,
    nombre: "Roberto Méndez",
    rating: 4.5,
    especialidad: "Mecánica general",
    imagenPerfil: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    imagenPrincipal: "https://storage.googleapis.com/sigo-blog-production/2024/01/BLOG-16-_-AGOST.jpg",
    precioDesde: "$25.000",
    disponibilidad: "Lun - Vie, 8:00-17:00",
    ubicacion: "Av. Independencia 1500",
    telefono: "+56 9 3333 4444",
    experiencia: "15 años",
    servicios: [
      { id: 16, nombre: "Cambio de aceite", precio: "$25.000", duracion: "30 min", descripcion: "Cambio de aceite y filtro" },
      { id: 17, nombre: "Revisión general", precio: "$35.000", duracion: "60 min", descripcion: "Diagnóstico completo del vehículo" },
      { id: 18, nombre: "Frenos", precio: "$45.000", duracion: "90 min", descripcion: "Revisión y mantención de frenos" }
    ]
  },
    {
    id: 2,
    nombre: "Roberto gonzales",
    rating: 4.5,
    especialidad: "Mecánica general",
    imagenPerfil: "https://media.licdn.com/dms/image/v2/D4E03AQFUVLFVwRjn5w/profile-displayphoto-shrink_200_200/B4EZdXzlScG4AY-/0/1749524830398?e=2147483647&v=beta&t=rCaum3UCvKWd1d8zja9fkggzMP5zHAI7Tflz3KPM8iE",
    imagenPrincipal: "https://img.freepik.com/fotos-premium/mecanicos-trabajando-neumaticos-automoviles-taller-reparacion-automoviles_161094-24949.jpg",
    precioDesde: "$25.000",
    disponibilidad: "Lun - Vie, 8:00-17:00",
    ubicacion: "Av. Independencia 1500",
    telefono: "+56 9 3333 4444",
    experiencia: "15 años",
    servicios: [
      { id: 16, nombre: "Cambio de aceite", precio: "$25.000", duracion: "30 min", descripcion: "Cambio de aceite y filtro" },
      { id: 17, nombre: "Revisión general", precio: "$35.000", duracion: "60 min", descripcion: "Diagnóstico completo del vehículo" },
      { id: 18, nombre: "Frenos", precio: "$45.000", duracion: "90 min", descripcion: "Revisión y mantención de frenos" }
    ]
  },
    {
    id: 3,
    nombre: "Kike",
    rating: 4.5,
    especialidad: "Mecánica general",
    imagenPerfil: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/TFXJ5RSORFACDMLNZ7LHHZ6OQQ.jpg",
    imagenPrincipal: "https://cdn.aarp.net/content/dam/aarpe/es/home/hogar-familia/transporte-comunidades/info-2023/como-elegir-mecanico-de-confianza/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/container_image/articlecontentfragment/cfimage.coreimg.50.932.jpeg/content/dam/aarp/auto/2023/07/1140-new-auto-mechanic-bottom-of-car-esp.jpg",
    precioDesde: "$25.000",
    disponibilidad: "Lun - Vie, 8:00-17:00",
    ubicacion: "Av. Independencia 1500",
    telefono: "+56 9 3333 4444",
    experiencia: "15 años",
    servicios: [
      { id: 16, nombre: "Cambio de aceite", precio: "$25.000", duracion: "30 min", descripcion: "Cambio de aceite y filtro" },
      { id: 17, nombre: "Revisión general", precio: "$35.000", duracion: "60 min", descripcion: "Diagnóstico completo del vehículo" },
      { id: 18, nombre: "Frenos", precio: "$45.000", duracion: "90 min", descripcion: "Revisión y mantención de frenos" }
    ]
  },
];
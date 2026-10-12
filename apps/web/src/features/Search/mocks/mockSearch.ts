import type {
  SearchBusiness,
  SearchUser,
  SearchVideo,
} from "../types/search.types";


// ======================================================
// CUENTAS SUGERIDAS
// ======================================================
// ESTOS USUARIOS APARECERÁN CUANDO
// EL BUSCADOR ESTÉ VACÍO.

export const mockSuggestedUsers: SearchUser[] = [
  {
    id: "user-1",
    username: "barberia_legacy",
    fullName: "Barbería Legacy",
    avatar:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300",
    verified: true,
    followers: 1250,
    type: "user",
  },

  {
    id: "user-2",
    username: "estetica_glow",
    fullName: "Estética Glow",
    avatar:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300",
    verified: false,
    followers: 890,
    type: "user",
  },

  {
    id: "user-3",
    username: "mecanica_csm",
    fullName: "Mecánica C.S.M",
    avatar:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=300",
    verified: true,
    followers: 540,
    type: "user",
  },

  {
    id: "user-4",
    username: "garage_motor_pro",
    fullName: "Garage Motor Pro",
    avatar:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300",
    verified: true,
    followers: 1360,
    type: "user",
  },

  {
    id: "user-5",
    username: "dulce_tentacion",
    fullName: "Dulce Tentación",
    avatar:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
    verified: true,
    followers: 2300,
    type: "user",
  },

  {
    id: "user-6",
    username: "studio_nails",
    fullName: "Studio Nails",
    avatar:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300",
    verified: false,
    followers: 760,
    type: "user",
  },

  {
    id: "user-7",
    username: "cafe_del_barrio",
    fullName: "Café del Barrio",
    avatar:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
    verified: true,
    followers: 1480,
    type: "user",
  },

  {
    id: "user-8",
    username: "foto_moments",
    fullName: "Foto Moments",
    avatar:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=300",
    verified: false,
    followers: 670,
    type: "user",
  },

  {
    id: "user-9",
    username: "clases_con_mati",
    fullName: "Clases con Mati",
    avatar:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300",
    verified: false,
    followers: 420,
    type: "user",
  },

  {
    id: "user-10",
    username: "pasteleria_delicia",
    fullName: "Pastelería Delicia",
    avatar:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300",
    verified: true,
    followers: 1820,
    type: "user",
  },
];


// ======================================================
// NEGOCIOS Y PYMES
// ======================================================

export const mockBusinesses: SearchBusiness[] = [

  // ====================================================
  // MECÁNICOS / TALLERES
  // ====================================================

  {
    id: "business-1",
    name: "Mecánica Express",
    category: "Mecánica automotriz",
    description:
      "Diagnóstico, mantenimiento y reparación automotriz.",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500",
    rating: 4.8,
    distance: "A 450 m",
    verified: true,
    keywords: [
      "mecanica",
      "mecánica",
      "mecanico",
      "mecánico",
      "mecanicos",
      "mecánicos",
      "taller",
      "taller mecanico",
      "autos",
      "auto",
      "vehiculos",
      "vehículos",
      "reparacion",
      "reparación",
      "motor",
      "mantencion",
      "mantención",
      "mantenimiento",
    ],
    type: "business",
  },

  {
    id: "business-2",
    name: "Taller Automotriz Oporto",
    category: "Taller mecánico",
    description:
      "Mantenciones, frenos, suspensión, motor y diagnóstico.",
    image:
      "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=500",
    rating: 4.7,
    distance: "A 650 m",
    verified: true,
    keywords: [
      "mecanica",
      "mecánica",
      "mecanico",
      "mecánico",
      "mecanicos",
      "mecánicos",
      "taller",
      "taller mecanico",
      "motor",
      "frenos",
      "suspension",
      "suspensión",
      "diagnostico",
      "diagnóstico",
      "auto",
      "vehiculo",
      "vehículo",
    ],
    type: "business",
  },

  {
    id: "business-3",
    name: "Mecánica San Pedro",
    category: "Mecánica automotriz",
    description:
      "Frenos, suspensión, afinamiento y reparación general.",
    image:
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500",
    rating: 4.6,
    distance: "A 900 m",
    verified: false,
    keywords: [
      "mecanica",
      "mecánica",
      "mecanico",
      "mecánico",
      "mecanicos",
      "mecánicos",
      "taller",
      "frenos",
      "suspension",
      "suspensión",
      "afinamiento",
      "reparacion",
      "reparación",
      "auto",
    ],
    type: "business",
  },

  {
    id: "business-4",
    name: "Garage Motor Pro",
    category: "Taller mecánico",
    description:
      "Diagnóstico computarizado, motor, sensores y mantenciones.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
    rating: 4.9,
    distance: "A 1,1 km",
    verified: true,
    keywords: [
      "mecanica",
      "mecánica",
      "mecanico",
      "mecánico",
      "mecanicos",
      "mecánicos",
      "taller",
      "motor",
      "scanner",
      "diagnostico",
      "diagnóstico",
      "sensores",
      "mantencion",
      "mantención",
    ],
    type: "business",
  },

  {
    id: "business-5",
    name: "Servicio Automotriz Central",
    category: "Mecánica y mantención",
    description:
      "Cambio de aceite, embrague, distribución y reparación de motor.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500",
    rating: 4.5,
    distance: "A 1,8 km",
    verified: false,
    keywords: [
      "mecanica",
      "mecánica",
      "mecanico",
      "mecánico",
      "mecanicos",
      "mecánicos",
      "taller",
      "aceite",
      "embrague",
      "distribucion",
      "distribución",
      "motor",
      "reparacion",
      "reparación",
    ],
    type: "business",
  },


  // ====================================================
  // BARBERÍAS
  // ====================================================

  {
    id: "business-6",
    name: "Barbería El Corte",
    category: "Barbería",
    description:
      "Cortes modernos, barba y atención personalizada.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500",
    rating: 4.9,
    distance: "A 300 m",
    verified: true,
    keywords: [
      "barberia",
      "barbería",
      "barbero",
      "barberos",
      "peluqueria",
      "peluquería",
      "corte",
      "cabello",
      "pelo",
      "barba",
      "afeitado",
    ],
    type: "business",
  },

  {
    id: "business-7",
    name: "Barber Shop Central",
    category: "Barbería",
    description:
      "Cortes clásicos y modernos para adultos y niños.",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=500",
    rating: 4.7,
    distance: "A 550 m",
    verified: false,
    keywords: [
      "barberia",
      "barbería",
      "barbero",
      "barberos",
      "corte",
      "pelo",
      "cabello",
      "barba",
    ],
    type: "business",
  },

  {
    id: "business-8",
    name: "Black Razor Barber",
    category: "Barbería",
    description:
      "Barbería especializada en degradados y diseño de barba.",
    image:
      "https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=500",
    rating: 4.8,
    distance: "A 850 m",
    verified: true,
    keywords: [
      "barberia",
      "barbería",
      "barbero",
      "fade",
      "degradado",
      "barba",
      "corte",
    ],
    type: "business",
  },

  {
    id: "business-9",
    name: "Old School Barber",
    category: "Barbería",
    description:
      "Corte tradicional, afeitado y cuidado masculino.",
    image:
      "https://images.unsplash.com/photo-1593702295094-aea22597af65?w=500",
    rating: 4.6,
    distance: "A 1,3 km",
    verified: false,
    keywords: [
      "barberia",
      "barbería",
      "barbero",
      "afeitado",
      "barba",
      "corte",
      "masculino",
    ],
    type: "business",
  },

  {
    id: "business-10",
    name: "Urban Barber Studio",
    category: "Barbería",
    description:
      "Cortes urbanos, perfilado de barba y asesoría de estilo.",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500",
    rating: 4.9,
    distance: "A 1,5 km",
    verified: true,
    keywords: [
      "barberia",
      "barbería",
      "barbero",
      "barberos",
      "corte",
      "barba",
      "perfilado",
      "estilo",
    ],
    type: "business",
  },


  // ====================================================
  // PASTELERÍAS
  // ====================================================

  {
    id: "business-11",
    name: "Pastelería Dulce Momento",
    category: "Pastelería",
    description:
      "Tortas personalizadas y productos para eventos.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    rating: 5,
    distance: "A 1,2 km",
    verified: false,
    keywords: [
      "pasteleria",
      "pastelería",
      "pasteles",
      "pastel",
      "torta",
      "tortas",
      "dulces",
      "reposteria",
      "repostería",
      "cumpleaños",
      "eventos",
    ],
    type: "business",
  },

  {
    id: "business-12",
    name: "Dulce Tentación",
    category: "Pastelería",
    description:
      "Tortas, cupcakes y dulces personalizados.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    rating: 4.9,
    distance: "A 700 m",
    verified: true,
    keywords: [
      "pasteleria",
      "pastelería",
      "pastel",
      "pasteles",
      "torta",
      "tortas",
      "cupcake",
      "cupcakes",
      "dulces",
      "reposteria",
      "repostería",
    ],
    type: "business",
  },

  {
    id: "business-13",
    name: "Sabores de Casa",
    category: "Pastelería artesanal",
    description:
      "Repostería artesanal, tartas y postres caseros.",
    image:
      "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=500",
    rating: 4.7,
    distance: "A 1 km",
    verified: false,
    keywords: [
      "pasteleria",
      "pastelería",
      "pastel",
      "torta",
      "tartas",
      "postres",
      "reposteria",
      "dulces",
    ],
    type: "business",
  },

  {
    id: "business-14",
    name: "Pastelería Delicia",
    category: "Pastelería",
    description:
      "Tortas para cumpleaños, matrimonios y celebraciones.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    rating: 4.8,
    distance: "A 1,6 km",
    verified: true,
    keywords: [
      "pasteleria",
      "pastelería",
      "pastel",
      "pasteles",
      "torta",
      "tortas",
      "cumpleaños",
      "matrimonio",
      "dulces",
    ],
    type: "business",
  },

  {
    id: "business-15",
    name: "Sweet Cake Studio",
    category: "Pastelería creativa",
    description:
      "Diseño de tortas temáticas, cupcakes y mesas dulces.",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    rating: 4.9,
    distance: "A 2 km",
    verified: true,
    keywords: [
      "pasteleria",
      "pastelería",
      "pastel",
      "torta",
      "tortas",
      "cupcake",
      "dulces",
      "reposteria",
      "eventos",
    ],
    type: "business",
  },


  // ====================================================
  // UÑAS / ESTÉTICA
  // ====================================================

  {
    id: "business-16",
    name: "Studio Nails & Beauty",
    category: "Manicure y estética",
    description:
      "Manicure, uñas acrílicas, esmaltado permanente y belleza.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500",
    rating: 4.9,
    distance: "A 800 m",
    verified: true,
    keywords: [
      "uñas",
      "unas",
      "manicure",
      "pedicure",
      "acrilicas",
      "acrílicas",
      "esmaltado",
      "estetica",
      "estética",
      "belleza",
      "salon",
      "salón",
    ],
    type: "business",
  },

  {
    id: "business-17",
    name: "Nails Queen",
    category: "Centro de uñas",
    description:
      "Diseño de uñas, gel, acrílicas y manicure.",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500",
    rating: 4.8,
    distance: "A 1 km",
    verified: true,
    keywords: [
      "uñas",
      "unas",
      "nails",
      "manicure",
      "gel",
      "acrilicas",
      "diseño",
      "belleza",
    ],
    type: "business",
  },

  {
    id: "business-18",
    name: "Glow Beauty Center",
    category: "Estética y belleza",
    description:
      "Manicure, pestañas, cejas y tratamientos de belleza.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500",
    rating: 4.7,
    distance: "A 1,4 km",
    verified: false,
    keywords: [
      "uñas",
      "unas",
      "manicure",
      "pestañas",
      "cejas",
      "estetica",
      "estética",
      "belleza",
    ],
    type: "business",
  },

  {
    id: "business-19",
    name: "Bella Nails Studio",
    category: "Manicure",
    description:
      "Esmaltado permanente, diseños personalizados y pedicure.",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500",
    rating: 4.6,
    distance: "A 1,7 km",
    verified: false,
    keywords: [
      "uñas",
      "unas",
      "manicure",
      "pedicure",
      "esmaltado",
      "diseño",
      "nails",
    ],
    type: "business",
  },

  {
    id: "business-20",
    name: "Luxury Nails",
    category: "Centro de uñas",
    description:
      "Uñas acrílicas, soft gel y diseños premium.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500",
    rating: 4.9,
    distance: "A 2,1 km",
    verified: true,
    keywords: [
      "uñas",
      "unas",
      "nails",
      "acrilicas",
      "acrílicas",
      "soft gel",
      "manicure",
      "diseño",
    ],
    type: "business",
  },


  // ====================================================
  // CAFETERÍAS
  // ====================================================

  {
    id: "business-21",
    name: "Café Central",
    category: "Cafetería",
    description:
      "Café, desayunos, pastelería y opciones para compartir.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    rating: 4.6,
    distance: "A 1 km",
    verified: false,
    keywords: [
      "cafe",
      "café",
      "cafeteria",
      "cafetería",
      "desayuno",
      "desayunos",
      "pasteles",
      "dulces",
      "comida",
      "coffee",
    ],
    type: "business",
  },

  {
    id: "business-22",
    name: "Café del Barrio",
    category: "Cafetería",
    description:
      "Café artesanal, sándwiches y repostería.",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500",
    rating: 4.8,
    distance: "A 650 m",
    verified: true,
    keywords: [
      "cafe",
      "café",
      "cafeteria",
      "cafetería",
      "coffee",
      "sandwich",
      "reposteria",
      "desayuno",
    ],
    type: "business",
  },

  {
    id: "business-23",
    name: "Coffee House",
    category: "Cafetería",
    description:
      "Especialidad en café de grano y brunch.",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500",
    rating: 4.9,
    distance: "A 1,3 km",
    verified: true,
    keywords: [
      "cafe",
      "café",
      "coffee",
      "cafeteria",
      "cafetería",
      "brunch",
      "desayuno",
    ],
    type: "business",
  },

  {
    id: "business-24",
    name: "La Esquina Café",
    category: "Cafetería",
    description:
      "Café, té, pastelería y espacio para reuniones.",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500",
    rating: 4.5,
    distance: "A 1,8 km",
    verified: false,
    keywords: [
      "cafe",
      "café",
      "cafeteria",
      "cafetería",
      "te",
      "té",
      "pasteleria",
      "reunion",
    ],
    type: "business",
  },

  {
    id: "business-25",
    name: "Urban Coffee",
    category: "Cafetería",
    description:
      "Café de especialidad, postres y desayunos.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500",
    rating: 4.7,
    distance: "A 2,2 km",
    verified: true,
    keywords: [
      "cafe",
      "café",
      "cafeteria",
      "cafetería",
      "coffee",
      "postres",
      "desayuno",
    ],
    type: "business",
  },


  // ====================================================
  // FOTOGRAFÍA
  // ====================================================

  {
    id: "business-26",
    name: "Foto Moments",
    category: "Fotografía",
    description:
      "Fotografía para matrimonios, cumpleaños y eventos.",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=500",
    rating: 4.8,
    distance: "A 1,4 km",
    verified: true,
    keywords: [
      "fotografia",
      "fotografía",
      "fotografo",
      "fotógrafo",
      "fotos",
      "eventos",
      "matrimonio",
      "cumpleaños",
      "sesion",
      "sesión",
    ],
    type: "business",
  },

  {
    id: "business-27",
    name: "Studio Capture",
    category: "Fotografía profesional",
    description:
      "Sesiones familiares, retratos y fotografía comercial.",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500",
    rating: 4.9,
    distance: "A 1,6 km",
    verified: true,
    keywords: [
      "fotografia",
      "fotografía",
      "fotografo",
      "fotógrafo",
      "fotos",
      "retratos",
      "sesiones",
      "estudio",
    ],
    type: "business",
  },

  {
    id: "business-28",
    name: "Luz & Foto",
    category: "Fotografía",
    description:
      "Fotografía de productos, personas y eventos.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    rating: 4.7,
    distance: "A 2 km",
    verified: false,
    keywords: [
      "fotografia",
      "fotografía",
      "fotografo",
      "fotógrafo",
      "producto",
      "eventos",
      "fotos",
    ],
    type: "business",
  },

  {
    id: "business-29",
    name: "Click Studio",
    category: "Fotografía y video",
    description:
      "Fotografía, video y cobertura de eventos.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    rating: 4.6,
    distance: "A 2,3 km",
    verified: false,
    keywords: [
      "fotografia",
      "fotografía",
      "fotografo",
      "fotógrafo",
      "video",
      "eventos",
      "fotos",
    ],
    type: "business",
  },

  {
    id: "business-30",
    name: "Memories Photography",
    category: "Fotografía",
    description:
      "Fotografía de matrimonios, parejas y familias.",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500",
    rating: 4.9,
    distance: "A 2,8 km",
    verified: true,
    keywords: [
      "fotografia",
      "fotografía",
      "fotografo",
      "fotógrafo",
      "matrimonio",
      "parejas",
      "familias",
      "fotos",
    ],
    type: "business",
  },


  // ====================================================
  // CLASES PARTICULARES
  // ====================================================

  {
    id: "business-31",
    name: "Aprende Fácil",
    category: "Clases particulares",
    description:
      "Clases particulares de matemáticas, lenguaje e inglés.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
    rating: 4.9,
    distance: "A 2 km",
    verified: false,
    keywords: [
      "clases",
      "profesor",
      "profesora",
      "matematicas",
      "matemáticas",
      "lenguaje",
      "ingles",
      "inglés",
      "estudio",
      "tutoria",
      "tutoría",
      "tutor",
    ],
    type: "business",
  },

  {
    id: "business-32",
    name: "Profesor en Casa",
    category: "Clases particulares",
    description:
      "Apoyo escolar y preparación de pruebas.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500",
    rating: 4.7,
    distance: "A 1,5 km",
    verified: true,
    keywords: [
      "clases",
      "profesor",
      "profesora",
      "apoyo escolar",
      "pruebas",
      "estudio",
      "tutor",
    ],
    type: "business",
  },

  {
    id: "business-33",
    name: "Academia Aprende Más",
    category: "Clases y tutorías",
    description:
      "Matemáticas, ciencias, lenguaje e inglés.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
    rating: 4.8,
    distance: "A 2,1 km",
    verified: true,
    keywords: [
      "clases",
      "academia",
      "tutoria",
      "tutoría",
      "matematicas",
      "matemáticas",
      "ciencias",
      "ingles",
      "inglés",
    ],
    type: "business",
  },

  {
    id: "business-34",
    name: "Tutorías Santiago",
    category: "Tutorías",
    description:
      "Tutorías personalizadas para estudiantes.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
    rating: 4.6,
    distance: "A 2,6 km",
    verified: false,
    keywords: [
      "clases",
      "tutoria",
      "tutoría",
      "tutor",
      "estudiantes",
      "profesor",
      "estudio",
    ],
    type: "business",
  },

  {
    id: "business-35",
    name: "Clases con Mati",
    category: "Clases particulares",
    description:
      "Clases de matemáticas y preparación para exámenes.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500",
    rating: 4.9,
    distance: "A 3 km",
    verified: true,
    keywords: [
      "clases",
      "matematicas",
      "matemáticas",
      "profesor",
      "tutor",
      "examen",
      "examenes",
      "exámenes",
      "pyme",
    ],
    type: "business",
  },
];


// ======================================================
// VIDEOS / EXPLORAR
// ======================================================

export const mockExploreVideos: SearchVideo[] = [
  {
    id: "video-1",
    title: "Transformación de corte",
    thumbnail:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500",
    views: 3200,
    type: "video",
  },

  {
    id: "video-2",
    title: "Diagnóstico de motor",
    thumbnail:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=500",
    views: 1800,
    type: "video",
  },

  {
    id: "video-3",
    title: "Cambio de aceite paso a paso",
    thumbnail:
      "https://images.unsplash.com/photo-1632823471565-1ecdf5c6d7f8?w=500",
    views: 5200,
    type: "video",
  },

  {
    id: "video-4",
    title: "Reparación de motor",
    thumbnail:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=500",
    views: 4300,
    type: "video",
  },

  {
    id: "video-5",
    title: "Servicio de frenos",
    thumbnail:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
    views: 2800,
    type: "video",
  },

  {
    id: "video-6",
    title: "Corte degradado profesional",
    thumbnail:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500",
    views: 4100,
    type: "video",
  },

  {
    id: "video-7",
    title: "Diseño de barba",
    thumbnail:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=500",
    views: 3600,
    type: "video",
  },

  {
    id: "video-8",
    title: "Decoración de torta",
    thumbnail:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    views: 2750,
    type: "video",
  },

  {
    id: "video-9",
    title: "Cupcakes personalizados",
    thumbnail:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    views: 2100,
    type: "video",
  },

  {
    id: "video-10",
    title: "Diseño de uñas acrílicas",
    thumbnail:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500",
    views: 4700,
    type: "video",
  },

  {
    id: "video-11",
    title: "Manicure paso a paso",
    thumbnail:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500",
    views: 3900,
    type: "video",
  },

  {
    id: "video-12",
    title: "Preparando café artesanal",
    thumbnail:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    views: 1900,
    type: "video",
  },

  {
    id: "video-13",
    title: "Cómo preparar un buen espresso",
    thumbnail:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500",
    views: 3300,
    type: "video",
  },

  {
    id: "video-14",
    title: "Sesión fotográfica para parejas",
    thumbnail:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=500",
    views: 3300,
    type: "video",
  },

  {
    id: "video-15",
    title: "Fotografía profesional de eventos",
    thumbnail:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    views: 2500,
    type: "video",
  },

  {
    id: "video-16",
    title: "Técnicas para aprender matemáticas",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
    views: 1450,
    type: "video",
  },

  {
    id: "video-17",
    title: "Consejos para estudiar mejor",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
    views: 2200,
    type: "video",
  },
];
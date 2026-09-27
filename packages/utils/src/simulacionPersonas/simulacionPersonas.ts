interface Direccion {
  calle: string;
  ciudad: string;
  region: string;
  pais: string;
}

interface Precio {
  moneda: string;
  rangoMin: number;
  rangoMax: number;
  unidad: string;
}

interface Emprendimiento {
  nombre: string;
  servicios: string[];
  oficio: string;
  direccion: Direccion;
  imagenes: string[];
  descripcion: string;
  precio: Precio;
}

interface Usuario {
  id: string;
  nombreCompleto: string;
  correo: string;
  contraseña: string;
  emprendimiento: Emprendimiento;
}

interface BaseDatos {
  usuarios: Usuario[];
}

// ___________________________

const data: BaseDatos = {
  usuarios: [
    {
      id: "USR001",
      nombreCompleto: "Patricia Flores Muñoz",
      correo: "patricia.flores@email.com",
      contraseña: "hashed_password_123",
      emprendimiento: {
        nombre: "Masajes Terapéuticos Patricia",
        servicios: ["Masajes descontracturantes", "Masajes relajantes", "Reflexología", "Masajes deportivos"],
        oficio: "Masoterapeuta",
        direccion: {
          calle: "Av. Providencia 1845",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/masajes1.jpg",
          "https://ejemplo.com/masajes2.jpg",
          "https://ejemplo.com/sala.jpg"
        ],
        descripcion: "Masoterapia profesional con más de 8 años de experiencia. Atención personalizada para aliviar dolores musculares y estrés. Sesiones a domicilio disponibles.",
        precio: {
          moneda: "CLP",
          rangoMin: 15000,
          rangoMax: 35000,
          unidad: "por sesión"
        }
      }
    },
    {
      id: "USR002",
      nombreCompleto: "Roberto Sánchez Vera",
      correo: "roberto.sanchez@email.com",
      contraseña: "hashed_password_456",
      emprendimiento: {
        nombre: "Taller Mecánico Don Roberto",
        servicios: ["Mantenimiento general", "Reparación motor", "Diagnóstico computarizado", "Cambio de aceite", "Frenos y suspensión"],
        oficio: "Mecánico",
        direccion: {
          calle: "Calle San Diego 3421",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/taller1.jpg",
          "https://ejemplo.com/taller2.jpg",
          "https://ejemplo.com/herramientas.jpg"
        ],
        descripcion: "Taller mecánico con 15 años de experiencia en todo tipo de vehículos. Diagnóstico profesional y reparaciones garantizadas. Atención honesta y precios justos.",
        precio: {
          moneda: "CLP",
          rangoMin: 20000,
          rangoMax: 300000,
          unidad: "según servicio"
        }
      }
    },
    {
      id: "USR003",
      nombreCompleto: "Daniela Contreras Rojas",
      correo: "daniela.contreras@email.com",
      contraseña: "hashed_password_789",
      emprendimiento: {
        nombre: "Uñas Perfectas Dani",
        servicios: ["Manicure tradicional", "Manicure permanente", "Uñas acrílicas", "Nail art", "Esmaltado semipermanente"],
        oficio: "Manicurista",
        direccion: {
          calle: "Pasaje Las Flores 567",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/nails1.jpg",
          "https://ejemplo.com/nails2.jpg",
          "https://ejemplo.com/nails3.jpg",
          "https://ejemplo.com/salon.jpg"
        ],
        descripcion: "Especialista en manicure y diseño de uñas. Trabajo prolijo con productos de calidad. Atención en local céntrico o a domicilio.",
        precio: {
          moneda: "CLP",
          rangoMin: 8000,
          rangoMax: 25000,
          unidad: "por servicio"
        }
      }
    },
    {
      id: "USR004",
      nombreCompleto: "Javier Morales Pérez",
      correo: "javier.morales@email.com",
      contraseña: "hashed_password_101",
      emprendimiento: {
        nombre: "Café Bar El Encuentro",
        servicios: ["Café especialidad", "Bebidas preparadas", "Cócteles", "Tragos clásicos", "Smoothies"],
        oficio: "Barista",
        direccion: {
          calle: "Av. Italia 945",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/cafe1.jpg",
          "https://ejemplo.com/cafe2.jpg",
          "https://ejemplo.com/barista.jpg"
        ],
        descripcion: "Barista certificado con pasión por el café de especialidad. Preparamos cada taza con técnicas profesionales y granos de origen seleccionado. Ambiente acogedor para trabajar o reunirse.",
        precio: {
          moneda: "CLP",
          rangoMin: 2500,
          rangoMax: 8000,
          unidad: "por bebida"
        }
      }
    },
    {
      id: "USR005",
      nombreCompleto: "Claudia Herrera Lagos",
      correo: "claudia.herrera@email.com",
      contraseña: "hashed_password_202",
      emprendimiento: {
        nombre: "Clases Particulares Profesora Claudia",
        servicios: ["Matemáticas", "Física", "Química", "Preparación PSU", "Reforzamiento escolar"],
        oficio: "Profesora",
        direccion: {
          calle: "Calle Los Profesores 1234",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/clase1.jpg",
          "https://ejemplo.com/clase2.jpg",
          "https://ejemplo.com/material.jpg"
        ],
        descripcion: "Profesora de matemáticas y ciencias con 12 años de experiencia. Clases personalizadas adaptadas al ritmo de cada estudiante. Método didáctico y resultados comprobables.",
        precio: {
          moneda: "CLP",
          rangoMin: 15000,
          rangoMax: 30000,
          unidad: "por hora"
        }
      }
    },
    {
      id: "USR006",
      nombreCompleto: "Andrés Castro Villalobos",
      correo: "andres.castro@email.com",
      contraseña: "hashed_password_303",
      emprendimiento: {
        nombre: "Barbería Classic Style",
        servicios: ["Corte clásico", "Corte moderno", "Afeitado tradicional", "Arreglo de barba", "Diseño de cejas"],
        oficio: "Barbero",
        direccion: {
          calle: "Av. Matta 2345",
          ciudad: "Santiago",
          region: "Metropolitana",
          pais: "Chile"
        },
        imagenes: [
          "https://ejemplo.com/barberia1.jpg",
          "https://ejemplo.com/barberia2.jpg",
          "https://ejemplo.com/corte1.jpg",
          "https://ejemplo.com/local.jpg"
        ],
        descripcion: "Barbería tradicional con técnicas modernas. Atención personalizada en ambiente masculino y relajado. Especialistas en cortes clásicos y barbas.",
        precio: {
          moneda: "CLP",
          rangoMin: 8000,
          rangoMax: 20000,
          unidad: "por servicio"
        }
      }
    }
  ]
};

export type { Usuario, Emprendimiento, Direccion, Precio, BaseDatos };
export { data };
import {
  Disc3,
  Gauge,
  Navigation,
  Users,
  Wrench,
} from "lucide-react";
import type {
  Highlight,
  ProfileData,
  ProfilePostMock,
  ProfileReview,
  ProfileService,
  TeamMember,
} from "../types/profile.types";

export const coverImage =
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=85";

export const profileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85";

export const team: TeamMember[] = [
  { name: "César", role: "Diagnóstico general", status: "Disponible hoy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
  { name: "Matías", role: "Mantenimiento", status: "Ocupado", busy: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
  { name: "Diego", role: "Frenos y suspensión", status: "Disponible", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
];

export const services: ProfileService[] = [
  { name: "Cambio de aceite", price: "$25.000", duration: "45 min", description: "Cambio de aceite y filtro, revisión de niveles y estado general.", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=500&q=80" },
  { name: "Diagnóstico scanner", price: "$20.000", duration: "60 min", description: "Lectura de códigos y diagnóstico electrónico con reporte.", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=500&q=80" },
  { name: "Revisión de frenos", price: "$30.000", duration: "60 min", description: "Revisión completa de frenos, pastillas y discos.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80" },
  { name: "Mantención general", price: "$45.000", duration: "90 min", description: "Cambio de fluidos, revisión de filtros y chequeo completo.", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=500&q=80" },
];

export const reviews: ProfileReview[] = [
  { name: "Andrés R.", text: "Excelente servicio, muy profesionales y atentos. El auto quedó impecable.", date: "Hace 2 días", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { name: "Valentina M.", text: "Rápidos, confiables y con precios justos. Se nota la experiencia.", date: "Hace 1 semana", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { name: "Cristian P.", text: "Muy buena atención y cumplen con los tiempos. Taller 100% confiable.", date: "Hace 1 semana", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
];

export const gallery = [
  "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=500&q=80",
];

export const highlights: Highlight[] = [
  { label: "Trabajos", icon: Wrench },
  { label: "Servicios", icon: Gauge },
  { label: "Frenos", icon: Disc3 },
  { label: "Equipo", icon: Users },
  { label: "Ubicación", icon: Navigation },
];

export const defaultProfileData: ProfileData = {
  name: "Mecánica",
  secondName: "C.S.M",
  commercialName: "Mecánica C.S.M",
  category: "Taller mecánico",
  location: "Melipilla, Chile",
  bio: "Servicio mecánico integral para todo tipo de vehículos. Diagnóstico, mantención y reparación con garantía. Tu confianza es nuestro motor.",
  phone: "+56 9 8765 4321",
  instagram: "@mecanica.csm",
  address: "Av. Balmaceda 123, Melipilla",
  visibility: "Público",
  hours: { weekday: "08:00 - 20:00", saturday: "08:00 - 18:00", sunday: "10:00 - 16:00" },
};

export const profilePosts: ProfilePostMock[] = [
  { id: "profile-post-1", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80", caption: "Diagnóstico y mantención para que tu vehículo siga funcionando con seguridad.", date: "Hace 2 h", likes: 48 },
  { id: "profile-post-2", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80", caption: "Terminamos una nueva mantención general. Gracias por confiar en nuestro equipo.", date: "Ayer", likes: 72 },
  { id: "profile-post-3", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80", caption: "Revisión electrónica y scanner: detectamos el problema antes de reemplazar piezas.", date: "Hace 2 días", likes: 36 },
  { id: "profile-post-4", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80", caption: "Revisión completa de frenos. Seguridad primero en cada servicio.", date: "Hace 4 días", likes: 91 },
  { id: "profile-post-5", image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80", caption: "Así recibimos y entregamos cada vehículo: trabajo ordenado y transparente.", date: "Hace 5 días", likes: 64 },
  { id: "profile-post-6", image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=900&q=80", caption: "Un vistazo a nuestro día de trabajo en el taller.", date: "Hace 1 semana", likes: 53 },
  { id: "profile-post-7", image: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=80", caption: "Consejo: no esperes a que aparezca una falla para revisar los fluidos del vehículo.", date: "Hace 1 semana", likes: 84 },
  { id: "profile-post-8", image: "https://images.unsplash.com/photo-1632823471565-1ecdf5c6f8a6?auto=format&fit=crop&w=900&q=80", caption: "Cambio de aceite y filtro realizado. Listo para volver a la ruta.", date: "Hace 2 semanas", likes: 41 },
  { id: "profile-post-9", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80", caption: "Seguimos trabajando para entregar un servicio mecánico claro y confiable.", date: "Hace 2 semanas", likes: 59 },
];
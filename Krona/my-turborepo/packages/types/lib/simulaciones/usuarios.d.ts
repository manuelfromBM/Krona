export type Barbero = {
    id: number;
    nombre: string;
    rating: number;
    especialidad: string;
    imagenPerfil: string;
    imagenPrincipal: string;
    precioDesde: string;
    duracion: string;
    disponibilidad: string;
};
export type Manicurista = {
    id: number;
    nombre: string;
    rating: number;
    especialidad: string;
    imagenPerfil: string;
    imagenPrincipal: string;
    precioDesde: string;
    disponibilidad: string;
    servicios: Servicio[];
    ubicacion: string;
    telefono: string;
    experiencia: string;
};
export type Mecanico = {
    id: number;
    nombre: string;
    rating: number;
    especialidad: string;
    imagenPerfil: string;
    imagenPrincipal: string;
    precioDesde: string;
    disponibilidad: string;
    servicios: Servicio[];
    ubicacion: string;
    telefono: string;
    experiencia: string;
};
export type Servicio = {
    id: number;
    nombre: string;
    precio: string;
    duracion: string;
    descripcion: string;
};
//# sourceMappingURL=usuarios.d.ts.map
export function useDashboardData() {
  return {
    // ---- Citas ----
    citas: {
      hoy: 3,
      semana: 15,
      mes: 48,
    },

    // ---- Dinero real ----
    dinero: {
      hoy: 25000,
      semana: 140000,
      mes: 520000,
    },

    // ---- Visitas / tráfico ----
    visitas: {
      mensual: 180,
    },

    // ---- Vistas (nueva sección) ----
    vistas: {
      publicacion: {
        dia: 20,
        semana: 110,
        mes: 380,
      },
      perfil: {
        dia: 12,
        semana: 70,
        mes: 260,
      },
    },

    // ---- Ingresos futuros/esperados ----
    ingresosEsperados: {
      metaMensual: 700000,
      actual: 520000,
    },

    // ---- Clientes ----
    clientes: {
      fieles: 18,
      frecuentes: 28,
      ocasionales: 15,
    },

    // ---- Citas canceladas ----
    citasCanceladas: {
      mes: 7,
    },

    // ---- Servicios más pedidos ----
    serviciosPopulares: [
      { nombre: "Corte Hombre", cantidad: 25 },
      { nombre: "Perfilado Barba", cantidad: 14 },
      { nombre: "Tinte Cejas", cantidad: 8 },
    ],

    // ---- Servicios menos pedidos ----
    serviciosMenosPedidos: [
      { nombre: "Depilación Facial", cantidad: 2 },
      { nombre: "Lavado + Peinado", cantidad: 3 },
      { nombre: "Mascarilla Facial", cantidad: 4 },
    ],

    // ---- Datos para el gráfico ----
    chartData: {
      labels: ["L", "M", "X", "J", "V", "S", "D"],
      values: [2, 3, 1, 4, 6, 3, 2],
    },
  };
}

export function useDashboardData() {
  return {
    citas: {
      hoy: 3,
      semana: 15,
      mes: 48,
    },
    dinero: {
      hoy: 25000,
      semana: 140000,
      mes: 520000,
    },
    visitas: {
      mensual: 180,
    },
    serviciosPopulares: [
      { nombre: "Corte Hombre", cantidad: 25 },
      { nombre: "Perfilado Barba", cantidad: 14 },
      { nombre: "Tinte Cejas", cantidad: 8 },
    ],
    chartData: {
      labels: ["L", "M", "X", "J", "V", "S", "D"],
      values: [2, 3, 1, 4, 6, 3, 2],
    },
  };
}

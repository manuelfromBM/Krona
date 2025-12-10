import { useMemo } from "react";

type DayData = {
  fecha: string; // YYYY-MM-DD
  totalGanado: number;
  totalCitas: number;
  citas: {
    hora: string;
    cliente: string;
    servicio: string;
    precio: number;
  }[];
};

// --- EJEMPLO: Datos mockeados (luego vendrán del backend) ---
const mockCitas: DayData[] = [
  {
    fecha: "2025-02-01",
    totalGanado: 38000,
    totalCitas: 4,
    citas: [
      { hora: "10:00", cliente: "Ana", servicio: "Corte", precio: 8000 },
      { hora: "11:30", cliente: "Tomás", servicio: "Barba", precio: 6000 },
      { hora: "15:00", cliente: "Claudia", servicio: "Color", precio: 20000 },
      { hora: "17:30", cliente: "Diego", servicio: "Peinado", precio: 4000 },
    ],
  },
  {
    fecha: "2025-02-03",
    totalGanado: 18000,
    totalCitas: 2,
    citas: [
      { hora: "14:00", cliente: "Fernando", servicio: "Corte", precio: 8000 },
      { hora: "18:00", cliente: "Lucía", servicio: "Uñas", precio: 10000 },
    ],
  },
];

// --- HOOK PRINCIPAL ---
export function useDashboardPremiumCalendarioData(selectedDate: string) {
  // Día seleccionado (o día actual si no hay selección)
  const fechaSeleccionada = selectedDate || new Date().toISOString().split("T")[0];

  // =============== FILTRAR DÍA =====================
  const diaActual = useMemo(() => {
    return mockCitas.find((c) => c.fecha === fechaSeleccionada) || null;
  }, [fechaSeleccionada]);

  // =============== ARMAR SEMANA =====================
  const semana = useMemo(() => {
    const fecha = new Date(fechaSeleccionada);
    const diaSemana = fecha.getDay(); // 0 = domingo, 1 = lunes...
    const lunes = new Date(fecha);
    lunes.setDate(fecha.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));

    let diasSemana: {
      fecha: string;
      totalGanado: number;
      totalCitas: number;
    }[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);

      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const fechaStr = `${y}-${m}-${day}`;

      const data = mockCitas.find((c) => c.fecha === fechaStr);

      diasSemana.push({
        fecha: fechaStr,
        totalGanado: data?.totalGanado || 0,
        totalCitas: data?.totalCitas || 0,
      });
    }

    return diasSemana;
  }, [fechaSeleccionada]);

  // =============== ARMAR MES =====================
  const mes = useMemo(() => {
    const fecha = new Date(fechaSeleccionada);
    const year = fecha.getFullYear();
    const month = fecha.getMonth();

    const diasMes = new Date(year, month + 1, 0).getDate();

    let dias: {
      fecha: string;
      totalGanado: number;
      totalCitas: number;
    }[] = [];

    for (let i = 1; i <= diasMes; i++) {
      const y = year;
      const m = String(month + 1).padStart(2, "0");
      const day = String(i).padStart(2, "0");
      const fechaStr = `${y}-${m}-${day}`;

      const data = mockCitas.find((c) => c.fecha === fechaStr);

      dias.push({
        fecha: fechaStr,
        totalGanado: data?.totalGanado || 0,
        totalCitas: data?.totalCitas || 0,
      });
    }

    return dias;
  }, [fechaSeleccionada]);

  return {
    diaActual,
    semana,
    mes,
  };
}

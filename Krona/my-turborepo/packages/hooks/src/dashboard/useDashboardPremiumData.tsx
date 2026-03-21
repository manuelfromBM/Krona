import { useState, useEffect } from "react";

type Dinero = { hoy: number; semana: number; mes: number };
type Citas = { hoy: number; semana: number; mes: number; canceladasHoy?: number; canceladasSemana?: number; canceladasMes?: number };
type VistasSection = { perfil: { dia: number; semana: number; mes: number }; publicacion: { dia: number; semana: number; mes: number } };
type IngresosEsperados = { metaMensual: number; actual: number };
type ClienteCounts = { fieles: number; frecuentes: number; ocasionales: number };
type Servicio = { nombre: string; cantidad: number };
type ChartData = { labels: string[]; values: number[] };

export function useDashboardPremiumData() {
  // Estados/valores de ejemplo — adapta a tu lógica real (fetch / cálculo)
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const citas: Citas = { hoy: 0, semana: 0, mes: 0 };
  const dinero: Dinero = { hoy: 0, semana: 0, mes: 0 };
  const citasCanceladas = { hoy: 0, semana: 0, mes: 0 };
  const vistas: VistasSection = {
    perfil: { dia: 0, semana: 0, mes: 0 },
    publicacion: { dia: 0, semana: 0, mes: 0 },
  };
  const ingresosEsperados: IngresosEsperados = { metaMensual: 0, actual: 0 };
  const clientes: ClienteCounts = { fieles: 0, frecuentes: 0, ocasionales: 0 };
  const serviciosPopulares: Servicio[] = [];
  const serviciosMenosPedidos: Servicio[] = [];
  const chartData: ChartData = { labels: [], values: [] };
  const calendar: string[] = [];

  // Aquí deberías poner la lógica real (fetch, cálculo, useEffect...)
  useEffect(() => {
    // cargar datos reales y setear los estados
  }, []);

  return {
    selectedDay,
    setSelectedDay,
    selectedWeek,
    setSelectedWeek,
    selectedMonth,
    setSelectedMonth,
    // métricas
    citas,
    dinero,
    citasCanceladas,
    vistas,
    ingresosEsperados,
    clientes,
    serviciosPopulares,
    serviciosMenosPedidos,
    chartData,
    calendar,
  };
}

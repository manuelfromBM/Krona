// useDashboardMetricasData.ts
// Hook de métricas del mes para Krona Dashboard Premium

import { useMemo } from "react";

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
export interface DashboardEvento {
    cliente: string;
    servicio: string;
    precio: number;
    estado: string;
    pagado: boolean;
    fecha: Date;
    horaInicio: string;
    duracion?: number;
}

export interface MetricasMes {
    // Financiero
    ingresos: number;
    perdidas: number;
    ganancias: number;
    totalCobrado: number;
    totalPendiente: number;
    porcentajeMeta: number;
    metaMensual: number;

    // Citas
    totalCitas: number;
    totalCanceladas: number;
    tasaCancelacion: number;

    // Observaciones automáticas
    observaciones: string[];
    alertas: string[];

    // Métricas avanzadas
    clientesPerdidos: ClientePerdido[];
    ticketPorCliente: Record<string, number>;
    horaMasRentable: HoraRentable | null;
    rankingHoras: HoraRentable[];
    diaMasRentable: DiaRentable | null;
    rankingDias: DiaRentable[];
    clienteVIP: ClienteVIP | null;
    rankingVIPs: ClienteVIP[];
    servicioMasCancelado: ServicioCancelado | null;
    rankingCancelaciones: ServicioCancelado[];
    prediccionProximoMes: number;
    tendenciaPorcentaje: number;
}

export interface ClientePerdido {
    nombre: string;
    ultimaVisita: Date;
    diasSinVenir: number;
    totalGastado: number;
}

export interface ClienteVIP {
    nombre: string;
    totalGastado: number;
    totalCitas: number;
    ticketPromedio: number;
}

export interface HoraRentable {
    hora: string;
    totalIngresos: number;
    totalCitas: number;
}

export interface DiaRentable {
    dia: string;
    totalIngresos: number;
    totalCitas: number;
}

export interface ServicioCancelado {
    servicio: string;
    totalCancelaciones: number;
    porcentaje: number;
}

// ─────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────
interface Props {
    eventos: DashboardEvento[];
    currentDate: Date;
    metaMensual?: number;
    diasClientePerdido?: number;
}

export function useDashboardMetricasData({
    eventos,
    currentDate,
    metaMensual = 500000,
    diasClientePerdido = 30,
}: Props): MetricasMes {


    return useMemo(() => {
        const hoy = new Date();
        const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        // ─────────────────────────────────────────
        // FILTROS BASE
        // ─────────────────────────────────────────
        const eventosDelMes = eventos.filter(
            (e) =>
                e.fecha.getMonth() === currentDate.getMonth() &&
                e.fecha.getFullYear() === currentDate.getFullYear()
    );

    const activos = eventosDelMes.filter((e) => e.estado !== "cancelado");
    const activosTodos = eventos.filter((e) => e.estado !== "cancelado");

    // ─────────────────────────────────────────
    // MÉTRICAS FINANCIERAS DEL MES
    // ─────────────────────────────────────────
    const ingresos = activos.reduce((acc, e) => acc + e.precio, 0);

    const perdidas = eventosDelMes
        .filter((e) => e.estado === "cancelado")
        .reduce((acc, e) => acc + e.precio, 0);

    const ganancias = ingresos - perdidas;

    const totalCobrado = activos
        .filter((e) => e.pagado)
        .reduce((acc, e) => acc + e.precio, 0);

    const totalPendiente = ingresos - totalCobrado;
    const porcentajeMeta = metaMensual > 0 ? (totalCobrado / metaMensual) * 100 : 0;

    // ─────────────────────────────────────────
    // MÉTRICAS DE CITAS
    // ─────────────────────────────────────────
    const totalCitas = eventosDelMes.length;
    const totalCanceladas = eventosDelMes.filter((e) => e.estado === "cancelado").length;
    const tasaCancelacion = totalCitas > 0 ? (totalCanceladas / totalCitas) * 100 : 0;

    // ─────────────────────────────────────────
    // OBSERVACIONES Y ALERTAS AUTOMÁTICAS
    // ─────────────────────────────────────────
    const observaciones: string[] = [];
    const alertas: string[] = [];

    if (totalCitas > 0) {

        if (tasaCancelacion > 30) {
            observaciones.push(`Tienes una tasa de cancelación del ${Math.round(tasaCancelacion)}%. Considera activar recordatorios.`);
            alertas.push("Muchas cancelaciones este mes");
        }
        if (totalPendiente > 0) {
            observaciones.push(`Tienes $${totalPendiente.toLocaleString("es-CL")} pendientes de pago.`);
            alertas.push("Tienes pagos pendientes");
        }
        if (porcentajeMeta >= 100) {
            observaciones.push("¡Felicitaciones! Superaste tu meta mensual. 🎉");
        }
    }
    if (observaciones.length === 0) {
        observaciones.push("Tu rendimiento mensual es estable.");
    }

    // ─────────────────────────────────────────
    // 1. CLIENTES PERDIDOS
    // ─────────────────────────────────────────
    const ultimaVisita: Record<string, Date> = {};
    const gastoTotal: Record<string, number> = {};

    activosTodos.forEach((e) => {
        if (!ultimaVisita[e.cliente] || e.fecha > ultimaVisita[e.cliente]) {
            ultimaVisita[e.cliente] = e.fecha;
        }
        gastoTotal[e.cliente] = (gastoTotal[e.cliente] ?? 0) + e.precio;
    });

    const clientesPerdidos: ClientePerdido[] = Object.entries(ultimaVisita)
        .map(([nombre, fecha]) => ({
            nombre,
            ultimaVisita: fecha,
            diasSinVenir: Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24)),
            totalGastado: gastoTotal[nombre] ?? 0,
        }))
        .filter((c) => c.diasSinVenir >= diasClientePerdido)
        .sort((a, b) => b.diasSinVenir - a.diasSinVenir);

    // ─────────────────────────────────────────
    // 2. TICKET PROMEDIO POR CLIENTE
    // ─────────────────────────────────────────
    const citasCount: Record<string, number> = {};
    activosTodos.forEach((e) => {
        citasCount[e.cliente] = (citasCount[e.cliente] ?? 0) + 1;
    });

    const ticketPorCliente: Record<string, number> = {};
    Object.entries(gastoTotal).forEach(([nombre, total]) => {
        ticketPorCliente[nombre] = Math.round(total / (citasCount[nombre] ?? 1));
    });

    // ─────────────────────────────────────────
    // 3. HORA MÁS RENTABLE
    // ─────────────────────────────────────────
    const porHora: Record<string, { total: number; citas: number }> = {};
    activosTodos.forEach((e) => {
        if (!porHora[e.horaInicio]) porHora[e.horaInicio] = { total: 0, citas: 0 };
        porHora[e.horaInicio].total += e.precio;
        porHora[e.horaInicio].citas += 1;
    });

    const rankingHoras: HoraRentable[] = Object.entries(porHora)
      .map(([hora, { total, citas }]) => ({ hora, totalIngresos: total, totalCitas: citas }))
      .sort((a, b) => b.totalIngresos - a.totalIngresos);

    const horaMasRentable = rankingHoras[0] ?? null;

    // ─────────────────────────────────────────
    // 4. DÍA MÁS RENTABLE
    // ─────────────────────────────────────────
    const porDia: Record<number, { total: number; citas: number }> = {};
    activosTodos.forEach((e) => {
        const d = e.fecha.getDay();
            if (!porDia[d]) porDia[d] = { total: 0, citas: 0 };
            porDia[d].total += e.precio;
            porDia[d].citas += 1;
    });

    const rankingDias: DiaRentable[] = Object.entries(porDia)
        .map(([d, { total, citas }]) => ({
            dia: nombresDias[Number(d)],
            totalIngresos: total,
            totalCitas: citas,
        }))
        .sort((a, b) => b.totalIngresos - a.totalIngresos);

    const diaMasRentable = rankingDias[0] ?? null;

    // ─────────────────────────────────────────
    // 5. CLIENTE VIP
    // ─────────────────────────────────────────
    const rankingVIPs: ClienteVIP[] = Object.entries(gastoTotal)
        .map(([nombre, total]) => ({
            nombre,
            totalGastado: total,
            totalCitas: citasCount[nombre] ?? 1,
            ticketPromedio: ticketPorCliente[nombre] ?? 0,
        }))
        .sort((a, b) => b.totalGastado - a.totalGastado);

    const clienteVIP = rankingVIPs[0] ?? null;

    // ─────────────────────────────────────────
    // 6. SERVICIO MÁS CANCELADO
    // ─────────────────────────────────────────
    const totalServicios: Record<string, number> = {};
    const canceladosServicios: Record<string, number> = {};

    eventos.forEach((e) => {
        totalServicios[e.servicio] = (totalServicios[e.servicio] ?? 0) + 1;
            if (e.estado === "cancelado") {
            canceladosServicios[e.servicio] = (canceladosServicios[e.servicio] ?? 0) + 1;
        }
    });

    const rankingCancelaciones: ServicioCancelado[] = Object.entries(canceladosServicios)
        .map(([servicio, total]) => ({
            servicio,
            totalCancelaciones: total,
            porcentaje: Math.round((total / (totalServicios[servicio] ?? 1)) * 100),
        }))
        .sort((a, b) => b.totalCancelaciones - a.totalCancelaciones);

    const servicioMasCancelado = rankingCancelaciones[0] ?? null;

    // ─────────────────────────────────────────
    // 7. PREDICCIÓN PRÓXIMO MES
    // ─────────────────────────────────────────
    const ingresosPorMes: Record<string, number> = {};
    activosTodos.forEach((e) => {
        const key = `${e.fecha.getFullYear()}-${String(e.fecha.getMonth()).padStart(2, "0")}`;
        ingresosPorMes[key] = (ingresosPorMes[key] ?? 0) + e.precio;
    });

    const mesesOrdenados = Object.keys(ingresosPorMes).sort();
    const ultimos3 = mesesOrdenados.slice(-3).map((k) => ingresosPorMes[k]);

    let prediccionProximoMes = 0;
    let tendenciaPorcentaje = 0;

    if (ultimos3.length >= 2) {
        const promedio = ultimos3.reduce((a, b) => a + b, 0) / ultimos3.length;
        const ultimo = ultimos3[ultimos3.length - 1];
        const penultimo = ultimos3[ultimos3.length - 2];
        tendenciaPorcentaje = penultimo > 0
        ? Math.round(((ultimo - penultimo) / penultimo) * 100)
        : 0;
        prediccionProximoMes = Math.round(promedio * (1 + tendenciaPorcentaje / 100));
    } else if (ultimos3.length === 1) {
        prediccionProximoMes = ultimos3[0];
    }

    // ─────────────────────────────────────────
    // RETORNO COMPLETO
    // ─────────────────────────────────────────
    return {
        ingresos,
        perdidas,
        ganancias,
        totalCobrado,
        totalPendiente,
        porcentajeMeta,
        metaMensual,
        totalCitas,
        totalCanceladas,
        tasaCancelacion,
        observaciones,
        alertas,
        clientesPerdidos,
        ticketPorCliente,
        horaMasRentable,
        rankingHoras,
        diaMasRentable,
        rankingDias,
        clienteVIP,
        rankingVIPs,
        servicioMasCancelado,
        rankingCancelaciones,
        prediccionProximoMes,
        tendenciaPorcentaje,
    };
    }, [eventos, currentDate, metaMensual, diasClientePerdido]);
}
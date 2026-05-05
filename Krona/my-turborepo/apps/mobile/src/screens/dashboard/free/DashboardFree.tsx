// DashboardFree.tsx
// Dashboard versión gratuita de KRONA

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "./DashboardFree.styles";

import {
  useDashboardPremiumCalendarioData,
  useDashboardMetricasData,
} from "@packages/hooks";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const fmt = (n: number) => `$${n.toLocaleString("es-CL")}`;

// ─────────────────────────────────────────────
// COMPONENTES INTERNOS
// ─────────────────────────────────────────────
function MetricCard({
  title,
  value,
  sub,
  color = "#111827",
}: {
  title: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      {sub ? <Text style={styles.cardSub}>{sub}</Text> : null}
    </View>
  );
}

function LockedCard({ title }: { title: string }) {
  return (
    <View style={[styles.card, styles.cardLocked]}>
      <View style={styles.lockedRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>

      <Text style={styles.lockedText}>Disponible en Premium</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function DashboardFree() {
  const { eventos, currentDate } = useDashboardPremiumCalendarioData();

  const metricas = useDashboardMetricasData({
    eventos,
    currentDate,
  });

  // ─────────────────────────────────────────
  // DATOS DE HOY
  // ─────────────────────────────────────────
  const hoy = new Date();

  const eventosHoy = eventos.filter(
    (e) =>
      e.fecha.getDate() === hoy.getDate() &&
      e.fecha.getMonth() === hoy.getMonth() &&
      e.fecha.getFullYear() === hoy.getFullYear()
  );

  const gananciasHoy = eventosHoy
    .filter((e) => e.estado !== "cancelado")
    .reduce((acc, e) => acc + e.precio, 0);

  const citasHoy = eventosHoy.filter(
    (e) => e.estado !== "cancelado"
  ).length;

  const pendientesHoy = eventosHoy.filter(
    (e) => !e.pagado && e.estado !== "cancelado"
  ).length;

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>KRONA Studio</Text>
            <Text style={styles.subtitle}>
              Panel básico de tu negocio
            </Text>
          </View>

          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeText}>FREE</Text>
          </View>
        </View>

        {/* HOY */}
        <Text style={styles.sectionTitle}>📅 Hoy</Text>

        <View style={styles.row}>
          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardTitle}>Ganancias hoy</Text>
            <Text
              style={[
                styles.cardValue,
                { color: "#16A34A" },
              ]}
            >
              {fmt(gananciasHoy)}
            </Text>
          </View>

          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardTitle}>Citas hoy</Text>
            <Text style={styles.cardValue}>
              {citasHoy}
            </Text>

            {pendientesHoy > 0 && (
              <Text style={styles.cardSub}>
                {pendientesHoy} sin cobrar
              </Text>
            )}
          </View>
        </View>

        {/* ESTE MES */}
        <Text style={styles.sectionTitle}>📊 Este mes</Text>

        <MetricCard
          title="Total cobrado"
          value={fmt(metricas.totalCobrado)}
          sub={`Meta ${fmt(metricas.metaMensual)} · ${metricas.porcentajeMeta.toFixed(
            0
          )}%`}
          color="#16A34A"
        />

        {/* PROGRESS */}
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(
                  metricas.porcentajeMeta,
                  100
                )}%`,
                backgroundColor:
                  metricas.porcentajeMeta >= 100
                    ? "#16A34A"
                    : "#3B82F6",
              },
            ]}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardTitle}>
              Total citas
            </Text>
            <Text style={styles.cardValue}>
              {metricas.totalCitas}
            </Text>
          </View>

          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardTitle}>
              Canceladas
            </Text>

            <Text
              style={[
                styles.cardValue,
                { color: "#EF4444" },
              ]}
            >
              {metricas.totalCanceladas}
            </Text>

            <Text style={styles.cardSub}>
              {metricas.tasaCancelacion.toFixed(0)}%
              tasa
            </Text>
          </View>
        </View>

        {metricas.totalPendiente > 0 && (
          <View
            style={[
              styles.card,
              styles.cardWarning,
            ]}
          >
            <Text style={styles.cardTitle}>
              ⏳ Pendiente de cobro
            </Text>

            <Text
              style={[
                styles.cardValue,
                { color: "#F59E0B" },
              ]}
            >
              {fmt(metricas.totalPendiente)}
            </Text>

            <Text style={styles.cardSub}>
              Tienes pagos pendientes
            </Text>
          </View>
        )}

        {/* PREMIUM BLOQUEADO */}
        <Text style={styles.sectionTitle}>
          📈 Estadísticas avanzadas
        </Text>

        <LockedCard title="👑 Cliente VIP del mes" />
        <LockedCard title="⏰ Hora más rentable" />
        <LockedCard title="📅 Día más rentable" />
        <LockedCard title="👻 Clientes perdidos" />
        <LockedCard title="🔮 Proyección mensual" />
        <LockedCard title="📄 Reporte PDF" />

        {/* CTA PREMIUM */}
        <View style={styles.upgradeBox}>
          <Text style={styles.upgradeEmoji}>🚀</Text>

          <Text style={styles.upgradeTitle}>
            Pasa a Premium
          </Text>

          <Text style={styles.upgradeText}>
            Desbloquea métricas inteligentes,
            reportes profesionales y análisis
            completo de tu negocio.
          </Text>

          <View style={styles.upgradeFeatures}>
            <Text style={styles.upgradeFeatureItem}>
              📊 Gráficos avanzados
            </Text>

            <Text style={styles.upgradeFeatureItem}>
              👑 Ranking de clientes
            </Text>

            <Text style={styles.upgradeFeatureItem}>
              🔮 Predicción ingresos
            </Text>

            <Text style={styles.upgradeFeatureItem}>
              📄 Exportar PDF
            </Text>

            <Text style={styles.upgradeFeatureItem}>
              👻 Clientes perdidos
            </Text>
          </View>

          <TouchableOpacity
            style={styles.upgradeBtn}
            activeOpacity={0.85}
            onPress={() =>
              console.log("Ir a Premium")
            }
          >
            <Text style={styles.upgradeBtnText}>
              ✨ Mejorar a Premium
            </Text>
          </TouchableOpacity>

          <Text style={styles.upgradeNote}>
            🔥 7 días gratis · Cancela cuando
            quieras
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./DashboardFree.styles";
import { useGanancias } from "../../../../../../packages/hooks/src/dashboard/useDashboardPremiumData";

export default function DashboardFree() {
  const { gananciasDiarias, totalMes, promedioDia } = useGanancias();

  // valores específicos
  const gananciasHoy = gananciasDiarias.find((d) => d.fecha === "Hoy")?.monto ?? 0;
  const gananciasAyer = gananciasDiarias.find((d) => d.fecha === "Ayer")?.monto ?? 0;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Dashboard Gratis</Text>
        <Text style={styles.subtitle}>Resumen básico de tu negocio</Text>

        {/* GANANCIAS HOY */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ganancias de hoy</Text>
          <Text style={styles.cardValue}>${gananciasHoy.toLocaleString()}</Text>
        </View>

        {/* CITAS DEL DÍA (placeholder por ahora) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Citas del día</Text>
          <Text style={styles.cardValue}>—</Text>
        </View>

        {/* VISTAS DEL MES (placeholder por ahora) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vistas del mes</Text>
          <Text style={styles.cardValue}>—</Text>
        </View>

        {/* CANCELADAS DEL MES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Citas canceladas</Text>
          <Text style={styles.cardValue}>—</Text>
        </View>

        {/* CLIENTES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clientes</Text>
          <Text style={styles.cardValue}>
            Fieles: — | Frecuentes: — | Ocasionales: —
          </Text>
        </View>

        {/* BOX PARA MEJORAR */}
        <View style={styles.upgradeBox}>
          <Text style={styles.upgradeTitle}>¿Quieres estadísticas avanzadas?</Text>
          <Text style={styles.upgradeText}>Accede al Plan Premium para ver:</Text>

          <Text style={styles.upgradeBullet}>• Gráficos profesionales</Text>
          <Text style={styles.upgradeBullet}>• Total del mes: ${totalMes.toLocaleString()}</Text>
          <Text style={styles.upgradeBullet}>• Promedio por día: ${promedioDia.toLocaleString()}</Text>
          <Text style={styles.upgradeBullet}>• Ganancias y pérdidas del mes</Text>
          <Text style={styles.upgradeBullet}>• Reportes descargables</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mejorar a Premium</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

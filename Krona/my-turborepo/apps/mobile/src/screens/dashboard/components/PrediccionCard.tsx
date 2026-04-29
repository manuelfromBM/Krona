// PrediccionCard.tsx
import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  prediccionProximoMes: number;
  tendenciaPorcentaje: number;
  mesesUsados?: number; // cuántos meses se usaron para calcular
}

export function PrediccionCard({
  prediccionProximoMes,
  tendenciaPorcentaje,
  mesesUsados = 0,
}: Props) {

  // ─── Tres estados de tendencia ───
  const tendenciaPositiva = tendenciaPorcentaje > 0;
  const tendenciaNeutral  = tendenciaPorcentaje === 0;
  const tendenciaNegativa = tendenciaPorcentaje < 0;

  const tendenciaColor = tendenciaPositiva
    ? "#16A34A"   // verde
    : tendenciaNegativa
    ? "#EF4444"   // rojo
    : "#6B7280";  // gris — neutral

  const tendenciaIcono = tendenciaPositiva
    ? "▲"
    : tendenciaNegativa
    ? "▼"
    : "→";

  const tendenciaTexto = tendenciaPositiva
    ? "tendencia positiva"
    : tendenciaNegativa
    ? "tendencia negativa"
    : "sin cambios";

  // ─── Sin datos suficientes ───
  const sinDatos = prediccionProximoMes === 0 || mesesUsados === 0;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        🔮 Proyección Próximo Mes
      </Text>

      {sinDatos ? (
        // ─── Estado vacío ───
        <Text style={styles.vipSubtext}>
          Aún no hay suficientes datos para proyectar.{"\n"}
          Se necesita al menos 1 mes registrado.
        </Text>
      ) : (
        <>
          {/* Monto proyectado */}
          <Text style={styles.vipMoney}>
            ${prediccionProximoMes.toLocaleString("es-CL")}
          </Text>

          {/* Tendencia */}
          <Text
            style={[
              styles.vipSubtext,
              {
                color: tendenciaColor,
                fontWeight: "700",
                marginTop: 4,
              },
            ]}
          >
            {tendenciaIcono}{" "}
            {tendenciaNeutral
              ? "Sin cambios respecto al mes anterior"
              : `${Math.abs(tendenciaPorcentaje)}% ${tendenciaTexto}`
            }
          </Text>

          {/* Advertencia si hay pocos datos */}
          {mesesUsados < 3 && (
            <Text
              style={[
                styles.vipSubtext,
                { color: "#F59E0B", marginTop: 6 },
              ]}
            >
              ⚠️ Basado en {mesesUsados} mes{mesesUsados > 1 ? "es" : ""}.
              Con más datos la predicción mejora.
            </Text>
          )}

          {/* Nota informativa */}
          {mesesUsados >= 3 && (
            <Text style={styles.item}>
              Basado en tus últimos {mesesUsados} meses registrados.
            </Text>
          )}
        </>
      )}
    </View>
  );
}
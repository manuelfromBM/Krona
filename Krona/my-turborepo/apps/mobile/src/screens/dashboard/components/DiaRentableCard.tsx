// DiaRentableCard.tsx
import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface DiaRentable {
  dia: string;
  totalIngresos: number;
  totalCitas: number;
}

interface Props {
  diaMasRentable: DiaRentable | null;
  rankingDias?: DiaRentable[];
}

export function DiaRentableCard({
  diaMasRentable,
  rankingDias = [],
}: Props) {
  const sinDatos = !diaMasRentable;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        📅 Día Más Rentable
      </Text>

      {sinDatos ? (
        <Text style={styles.vipSubtext}>
          Aún no existen datos suficientes
          para detectar el mejor día.
        </Text>
      ) : (
        <>
          {/* Día top */}
          <Text style={styles.vipName}>
            {diaMasRentable.dia}
          </Text>

          {/* Total generado */}
          <Text style={styles.vipMoney}>
            ${diaMasRentable.totalIngresos.toLocaleString("es-CL")}
          </Text>

          {/* Citas */}
          <Text style={styles.vipSubtext}>
            {diaMasRentable.totalCitas} cita
            {diaMasRentable.totalCitas !== 1 ? "s" : ""}
          </Text>

          {/* Ranking extra */}
          {rankingDias.length > 1 && (
            <>
              <Text
                style={[
                  styles.item,
                  { marginTop: 10, fontWeight: "700" },
                ]}
              >
                Ranking semanal
              </Text>

              {rankingDias.slice(1, 4).map((item, index) => (
                <View
                  key={item.dia}
                  style={styles.rowBetween}
                >
                  <Text style={styles.item}>
                    {index + 1}. {item.dia}
                  </Text>

                  <Text style={styles.item}>
                    ${item.totalIngresos.toLocaleString("es-CL")}
                  </Text>
                </View>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
}
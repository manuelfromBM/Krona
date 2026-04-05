import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

interface Props {
  totalCobrado: number;
  metaMensual: number;
}

const screenWidth = Dimensions.get("window").width;

export const PagosVsPresupuestoChart = ({
  totalCobrado,
  metaMensual,
}: Props) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>
        Ganancias vs Meta
      </Text>

      <BarChart
        data={{
          labels: ["Cobrado", "Meta"],
          datasets: [
            {
              data: [totalCobrado, metaMensual],
            },
          ],
        }}
        width={screenWidth - 24}
        height={220}
        yAxisSuffix="$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(34,197,94,${opacity})`,
          labelColor: () => "#6B7280",
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};
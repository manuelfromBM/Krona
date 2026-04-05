import React from "react";
import { View, Text, Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";

interface TendenciaItem {
  mes: string;
  total: number;
}

interface Props {
  tendencia: TendenciaItem[];
  tipoGrafico: "line" | "pie";
  setTipoGrafico: React.Dispatch<React.SetStateAction<"line" | "pie">>;
}

const screenWidth = Dimensions.get("window").width;

export const TendenciaChart = ({ tendencia, tipoGrafico, setTipoGrafico }: Props) => {
  const labels = tendencia.map(item => item.mes);
  const data = tendencia.map(item => item.total);

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>
        Tendencia de ingresos
      </Text>

      <LineChart
        data={{
          labels,
          datasets: [
            { data }
          ],
        }}
        width={screenWidth - 24}
        height={220}
        yAxisSuffix="$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
          labelColor: () => "#6B7280",
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#3B82F6",
          },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};
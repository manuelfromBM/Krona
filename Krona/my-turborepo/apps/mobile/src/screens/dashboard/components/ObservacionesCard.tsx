import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  observaciones: string[];
}

export const ObservacionesCard = ({ observaciones }: Props) => {
  return (
    <View style={styles.observacionesCard}>
      <Text style={styles.observacionesTitle}>
        🧠 Observaciones automáticas
      </Text>

      {observaciones.map((obs, i) => (
        <Text key={i} style={styles.observacionItem}>
          • {obs}
        </Text>
      ))}
    </View>
  );
};
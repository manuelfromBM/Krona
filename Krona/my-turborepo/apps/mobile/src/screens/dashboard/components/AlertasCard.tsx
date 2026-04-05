import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  alertas: string[];
  setSelectedMetric: (value: string) => void;
  setShowModal: (value: boolean) => void;
}

export const AlertasCard = ({
  alertas,
  setSelectedMetric,
  setShowModal,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>⚠️ Alertas del mes</Text>

      {alertas.length === 0 ? (
        <Text style={styles.item}>No hay alertas este mes</Text>
      ) : (
        alertas.map((alerta, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedMetric(alerta);
              setShowModal(true);
            }}
          >
            <Text style={styles.item}>• {alerta}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};
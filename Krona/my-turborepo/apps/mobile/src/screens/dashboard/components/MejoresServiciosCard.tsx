import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Servicio {
  nombre: string;
  total: number;
}

interface Props {
  mejoresServicios: Servicio[];
  setSelectedMetric: (value: string) => void;
  setShowModal: (value: boolean) => void;
}

export const MejoresServiciosCard = ({ mejoresServicios, setSelectedMetric, setShowModal }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>🏆 Mejores servicios</Text>

      {mejoresServicios.map((s, i) => (
        <TouchableOpacity
          key={i}
          style={styles.rowBetween}
          onPress={() => {
            setSelectedMetric(s.nombre);
            setShowModal(true);
          }}
        >
          <Text>{s.nombre}</Text>
          <Text>${s.total.toLocaleString("es-CL")}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
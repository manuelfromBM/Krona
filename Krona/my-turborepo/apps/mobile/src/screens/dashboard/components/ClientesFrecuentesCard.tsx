import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Cliente {
  nombre: string;
  citas: number;
}

interface Props {
  clientesFrecuentes: Cliente[];
}

export const ClientesFrecuentesCard = ({ clientesFrecuentes }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>👥 Clientes frecuentes</Text>

      {clientesFrecuentes.map((c, i) => (
        <TouchableOpacity
          key={i}
          style={styles.rowBetween}
          onPress={() => console.log("Cliente seleccionado:", c.nombre)}
        >
          <Text>{c.nombre}</Text>
          <Text>{c.citas} citas</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
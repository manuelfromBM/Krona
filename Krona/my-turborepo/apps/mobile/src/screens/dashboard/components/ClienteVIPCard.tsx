import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface ClienteVIP {
    nombre: string;
    totalGastado: number;
    totalCitas: number;
    ticketPromedio: number;
} 

interface Props {
    clienteVIP: ClienteVIP | null;
}

export function ClienteVIPCard({ clienteVIP }: Props) {

    if (!clienteVIP) {
        return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>👑 Cliente VIP</Text>
            <Text style={styles.vipEmptyText}>
            Aún no hay datos suficientes.
            </Text>
        </View>
    );
  }

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>👑 Cliente VIP</Text>
    
            <Text style={styles.vipName}>
                {clienteVIP.nombre}
            </Text>

            <Text style={styles.vipMoney}>
              ${clienteVIP.totalGastado.toLocaleString("es-CL")}
            </Text>

            <Text style={styles.vipSubtext}>
              {clienteVIP.totalCitas} citas realizadas
            </Text>

            <Text style={styles.vipSubtext}>
              Ticket promedio: $
              {clienteVIP.ticketPromedio.toLocaleString("es-CL")}
            </Text>
        </View>
    );
}
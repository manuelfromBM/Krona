import React from "react";
import { View, Text } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface ClientePerdido {
    nombre: string;
    ultimaVisita: Date;
    diasSinVenir: number;
    totalGastado: number;
}

interface Props {
    clientesPerdidos: ClientePerdido[];
}

export function ClientesPerdidosCard({
    clientesPerdidos,
}: Props) {
    const top3 = clientesPerdidos.slice(0, 3);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>
                📉 Clientes Perdidos
            </Text>

            <Text style={styles.vipMoney}>
                {clientesPerdidos.length}
            </Text>

            <Text style={styles.vipSubtext}>
                clientes inactivos detectados
            </Text>

            {top3.length === 0 ? (
                <Text style={styles.emptyText}>
                    Excelente, no hay clientes perdidos.
                </Text>
            ) : (
                top3.map((cliente, index) => (
                    <View
                        key={cliente.nombre}
                        style={styles.rowBetween}
                    >
                        <Text style={styles.item}>
                            {cliente.nombre}
                        </Text>
                
                        <Text style={[styles.item, { color: "#EF4444", fontWeight: "700" }]}>
                            {cliente.diasSinVenir} días sin venir
                        </Text>
                    </View>
                ))
            )}
        </View>
    );
}
import React, { ReactNode } from "react";
import { useAcordionBtn } from "@packages/hooks";
import { View, Text, Pressable, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./notiicaciones.styles";

const Acordion = ({ title, children }: { title: string; children: ReactNode }) => {

    const { open, toggle, alturaAnimacion, rotacion } = useAcordionBtn()

    return (
        <View style={styles.acordionContainer}>
            <Pressable onPress={toggle} style={styles.header}>
                <Text style={styles.subTitulo}>{title}</Text>
                <Animated.Text style={[styles.flecha, { transform: [{ rotate: rotacion }] }]}>
                    ▼
                </Animated.Text>
            </Pressable>
            <Animated.View style={[
                styles.contenido,
                {
                    height: alturaAnimacion,
                    // Opacidad para un efecto más suave
                    opacity: alturaAnimacion.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 1]
                    })
                }
            ]}>
                {children}
            </Animated.View>
        </View>
    )
}

export default function ScreenNotificacinoes() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Notificaciones</Text>

            {/* Primer acordeón */}
            <Acordion title="Cristian a confirmado su cita!">
                <FontAwesome name="calendar" style={styles.textoContenido}> Fecha: 12/09/2025 </FontAwesome>
                <FontAwesome name="clock-o" style={styles.textoContenido}> Hora: 15:30 PM</FontAwesome>
                <FontAwesome name='scissors' style={styles.textoContenido}> Tipo de corte: Fade</FontAwesome>
            </Acordion>

            {/* Segundo acordeón */}
            <Acordion title="Matias a confirmado su cita!">
                <FontAwesome name="calendar" style={styles.textoContenido}> Fecha: 12/09/2025 </FontAwesome>
                <FontAwesome name="clock-o" style={styles.textoContenido}> Hora: 13:30 PM</FontAwesome>
                <FontAwesome name='scissors' style={styles.textoContenido}> Tipo de corte: Risos</FontAwesome>
            </Acordion>

            {/* Tercer acordeón */}
            <Acordion title="Manuel a confirmado su cita!">
                <FontAwesome name="calendar" style={styles.textoContenido}> Fecha: 12/09/2025 </FontAwesome>
                <FontAwesome name="clock-o" style={styles.textoContenido}> Hora: 14:30 PM</FontAwesome>
                <FontAwesome name='scissors' style={styles.textoContenido}> Tipo de corte: Pelado</FontAwesome>
            </Acordion>
        </View>
    );
}
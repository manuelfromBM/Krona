import React from "react";
import { View, Text, Image, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./notiicaciones.styles";

export default function ScreenNotificacinoes() {
    return (
        <View style={styles.ViewPrincipal}>
            <View style={styles.ViewTitulo}>
                <Text style={{ fontSize: 20, color: '#ffffffff' }}>Noticaciones</Text>
            </View>
            <View style={styles.ViewListaNotificacion}>
                <View style={styles.ViewImagenLogo}>
                    <Image source={{ uri: 'https://tradesmanskills.com/wp-content/uploads/how-to-become-a-mechanic.jpg' }}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                </View>
                <View style={styles.ViewEstadoCita}>
                    <Text style={{ fontSize: 15, color: '#ffffffff' }}>Cita confirmada!</Text>
                </View>
                <View style={styles.ViewDetalles}>
                </View>
            </View>
        </View>
    )
}
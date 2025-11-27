import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./Administrador.styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AdminStackParamList = {
    AdministradorScreen: undefined;
    ServiciosCrud: undefined;
};

type Props = NativeStackScreenProps<AdminStackParamList, "AdministradorScreen">;

export default function AdministradorScreen({ navigation }: Props) {
    const seccionesAdmin = [
        { icon: "✏️", title: "Servicios", description: "CRUD de servicios", screen: "ServiciosCrud" },
        // { icon: "🖼️", title: "Multimedia", description: "Subir y gestionar fotos", screen: null },
        // { icon: "💵", title: "Precios", description: "Editar precios", screen: null },
        { icon: "🗂️", title: "Categorías", description: "Gestionar categorías de servicios", screen: null },
        { icon: "👥", title: "Usuarios", description: "Gestión de usuarios y roles", screen: null },
        { icon: "🧾", title: "Facturación", description: "Gestionar facturas", screen: null },
        { icon: "⚙️", title: "Configuración", description: "Ajustes de la tienda", screen: null },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🛠️ Panel de Administración</Text>
                <Text style={styles.headerSubtitle}>Gestión del negocio</Text>
            </View>

            <View style={styles.grid}>
                {seccionesAdmin.map((section, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => section.screen && navigation.navigate(section.screen as any)}
                    >
                        <Text style={styles.cardIcon}>{section.icon}</Text>
                        <Text style={styles.cardTitle}>{section.title}</Text>
                        <Text style={styles.cardDescription}>{section.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
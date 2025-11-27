import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    Alert,
} from "react-native";
import { styles } from "./Crud.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Servicios = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type ServiciosStackParamList = {
    ServiciosCrud: undefined;
};

type Props = NativeStackScreenProps<ServiciosStackParamList, "ServiciosCrud">;

export default function ServiciosScreenCrud({ navigation }: Props) {
    const [servicios, setServicios] = useState<Servicios[]>([
        {
            id: "1",
            name: "Degradados",
            price: 10.000,
            image:
                "https://cdn2.hubspot.net/hubfs/2356021/spiky%201.jpg",
        },
        {
            id: "p2",
            name: "Corte de barba",
            price: 15.000,
            image:
                "https://www.shutterstock.com/image-photo/beard-styling-cut-close-cropped-600nw-675613801.jpg",
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<Servicios | null>(null);
    const [form, setForm] = useState({ name: "", price: "", image: "" });

    function openCreate() {
        setEditing(null);
        setForm({ name: "", price: "", image: "" });
        setModalVisible(true);
    }

    function openEdit(p: Servicios) {
        setEditing(p);
        setForm({ name: p.name, price: String(p.price), image: p.image });
        setModalVisible(true);
    }

    function saveServicio() {
        if (!form.name.trim() || !form.price) {
            Alert.alert("Validación", "Nombre y precio son obligatorios.");
            return;
        }
        if (editing) {
            setServicios((prev) =>
                prev.map((p) =>
                    p.id === editing.id
                        ? { ...p, name: form.name.trim(), price: parseFloat(form.price), image: form.image || p.image }
                        : p
                )
            );
        } else {
            const newServicio: Servicios = {
                id: "p" + Date.now(),
                name: form.name.trim(),
                price: parseFloat(form.price),
                image: form.image || "https://via.placeholder.com/300x200.png?text=Producto",
            };
            setServicios((prev) => [newServicio, ...prev]);
        }
        setModalVisible(false);
    }

    function confirmDelete(id: string) {
        Alert.alert("Eliminar Servicio", "¿Seguro que deseas eliminar este Servicio?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: () => setServicios((prev) => prev.filter((p) => p.id !== id)),
            },
        ]);
    }

    function renderItem({ item }: { item: Servicios }) {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.servicioImage} />
                <Text style={styles.servicioName}>{item.name}</Text>
                <Text style={styles.servicioPrice}>$ {item.price.toFixed(2)}</Text>

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, styles.deleteBtn]}
                        onPress={() => confirmDelete(item.id)}
                    >
                        <Text style={styles.actionText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inlineRow}>
                    <TouchableOpacity
                        style={styles.smallBtn}
                        onPress={() =>
                            Alert.alert("Multimedia", "Aquí podrías abrir un modal para gestionar varias imágenes.")
                        }
                    >
                        <Text style={styles.smallBtnText}>Multimedia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallBtn}
                        onPress={() =>
                            Alert.prompt &&
                            Alert.prompt("Editar precio", "Ingrese nuevo precio", [
                                {
                                    text: "Cancelar",
                                    style: "cancel",
                                },
                                {
                                    text: "Guardar",
                                    onPress: (text?: string) => {
                                        const value = parseFloat(text || "");
                                        if (isNaN(value)) return Alert.alert("Error", "Precio inválido");
                                        setServicios((prev) => prev.map((p) => (p.id === item.id ? { ...p, price: value } : p)));
                                    },
                                },
                            ])
                        }
                    >
                        <Text style={styles.smallBtnText}>Precio</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Servicios</Text>
                <TouchableOpacity style={styles.addBtn} onPress={openCreate}>
                    <Text style={styles.addBtnText}>+ Nuevo</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={servicios}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editing ? "Editar Servicio" : "Crear servicio"}</Text>

                        <TextInput
                            placeholder="Nombre"
                            style={styles.input}
                            value={form.name}
                            onChangeText={(t) => setForm((s) => ({ ...s, name: t }))}
                        />
                        <TextInput
                            placeholder="Precio"
                            style={styles.input}
                            keyboardType="decimal-pad"
                            value={form.price}
                            onChangeText={(t) => setForm((s) => ({ ...s, price: t }))}
                        />
                        <TextInput
                            placeholder="URL imagen"
                            style={styles.input}
                            value={form.image}
                            onChangeText={(t) => setForm((s) => ({ ...s, image: t }))}
                        />

                        <View style={styles.modalActions}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Guardar" onPress={saveServicio} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
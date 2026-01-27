import React from "react";
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
import { useServiciosCrud } from "@packages/hooks";

type ServiciosStackParamList = {
    ServiciosCrud: undefined;
};

type Props = NativeStackScreenProps<ServiciosStackParamList, "ServiciosCrud">;

export default function ServiciosScreenCrud({ navigation }: Props) {
    const initialServicios = [
        {
            id: "1",
            name: "Degradados",
            price: 10000,
            image: "https://cdn2.hubspot.net/hubfs/2356021/spiky%201.jpg",
        },
        {
            id: "p2",
            name: "Corte de barba",
            price: 15000,
            image:
                "https://www.shutterstock.com/image-photo/beard-styling-cut-close-cropped-600nw-675613801.jpg",
        },
    ];

    const {
        servicios,
        modalVisible,
        editing,
        form,
        openCreate,
        openEdit,
        saveServicio,
        confirmDelete,
        setForm,
    } = useServiciosCrud(initialServicios);

    type Servicio = typeof servicios[number];

    function renderItem({ item }: { item: Servicio }) {
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
                            Alert.alert(
                                "Multimedia",
                                "Aquí podrías abrir un modal para gestionar varias imágenes."
                            )
                        }
                    >
                        <Text style={styles.smallBtnText}>Multimedia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.smallBtn}
                        onPress={() => openEdit(item)}
                    >
                        <Text style={styles.smallBtnText}>Precio</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
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
                        <Text style={styles.modalTitle}>
                            {editing ? "Editar Servicio" : "Crear servicio"}
                        </Text>

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
                            <Button title="Cancelar" onPress={() => Alert.alert("Cerrar", "Cierra el modal desde el hook")} />
                            <Button title="Guardar" onPress={saveServicio} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
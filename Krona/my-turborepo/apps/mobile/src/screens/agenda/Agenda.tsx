import styles from "./Agenda.styles";
import React from "react";
import { View, Text, Image, Pressable, Modal, FlatList, ScrollView } from 'react-native'
import ModalGaleria from "./modalGaleria/Modal";
import { mecanicos, barberos, manicuristas } from "src/utils/simulacionPersonas/simulacion";
import { useModal } from "@packages/hooks";

export default function ScreenAgenda() {

    //Desempaquetamiento de la constante
    const { modalVisible, setModalVisible, openModal, closeModal } = useModal();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.ContainerPrincipal}>
                <View style={styles.ContenedorHijoBtns}>
                    <Text style={{ color: "#d4a574", fontSize: 16, fontWeight: "bold" }}>
                        Nuestros barberos
                    </Text>
                </View>

                {/* Simulacion dinamica con map */}
                {mecanicos.map((mecanicos) => (
                    <View key={mecanicos.id} style={styles.ContenedorHijo}>
                        <View style={styles.HeaderBarbero}>
                            <Image
                                style={styles.LogoReservaAgenda}
                                source={{ uri: mecanicos.imagenPerfil }}
                            />
                            <View style={styles.InfoBarbero}>
                                <Text style={styles.NombreBarbero}>{mecanicos.nombre}</Text>
                                <View style={styles.RatingContainer}>
                                    <Text style={styles.RatingStars}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.RatingText}>({mecanicos.rating})</Text>
                                </View>
                                <Text style={styles.EspecialidadText}>
                                    Especialista en {mecanicos.especialidad}
                                </Text>
                            </View>
                        </View>

                        {/* Imagen principal */}
                        <Image
                            source={{ uri: mecanicos.imagenPrincipal }}
                            style={styles.ViewImagen}
                        />

                        {/* Informacion detallada */}
                        <View style={styles.ViewDetalles}>
                            <View style={styles.ServiciosContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                    <Text style={{ color: "#2c2c2c", fontWeight: "600" }}>Servicios: </Text>
                                    <Pressable onPress={openModal}>
                                        <Text
                                            style={{
                                                color: "#d4a574",
                                                textDecorationLine: "underline",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Ver galería
                                        </Text>
                                    </Pressable>
                                </View>

                                <View style={styles.InfoRow}>
                                    <Text style={styles.InfoLabel}>💰 Desde:</Text>
                                    <Text style={styles.InfoValue}>{mecanicos.precioDesde}</Text>
                                </View>

                                {/* <View style={styles.InfoRow}>
                                    <Text style={styles.InfoLabel}>⏱️ Duración:</Text>
                                    <Text style={styles.InfoValue}>{mecanicos.duracion}</Text>
                                </View> */}

                                <View style={styles.InfoRow}>
                                    <Text style={styles.InfoLabel}>📅 Disponible:</Text>
                                    <Text style={styles.InfoValue}>{mecanicos.disponibilidad}</Text>
                                </View>
                            </View>

                            <Pressable style={styles.ViewBtnCita}>
                                <Text style={styles.BtnCitaText}>📅 Agendar Cita</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <ModalGaleria modalVisible={modalVisible} closeModal={closeModal} />
        </View>
    )
}


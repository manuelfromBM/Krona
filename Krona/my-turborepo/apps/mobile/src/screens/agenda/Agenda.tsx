import styles from "./Agenda.styles";
import React from "react";
import { useState } from 'react'
import { View, Text, Image, Pressable, Modal, FlatList, ScrollView } from 'react-native'
import { mecanicos, barberos, manicuristas } from "src/utils/simulacionPersonas/simulacion";
import { imagenesCortesClasicos, imagenesCortesDegradados } from '../../../../../packages/utils/src/imagenesTest/imagenes'

export default function ScreenAgenda() {

    const [modalVisible, setModalVisible] = useState(false)


    const RenderItemGaleria = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={{
                width: 110,
                height: 110,
                margin: 5,
                borderRadius: 10
            }}
        />
    )

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
                                    <Pressable onPress={() => setModalVisible(true)}>
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

            {/* Modal para la galeria */}
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.ViewPrincipalModalGaleria}>
                    {/* Botón cerrar elegante */}
                    <Pressable
                        style={styles.BotonCerrarModal}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ fontSize: 18, color: '#666', fontWeight: 'bold' }}>×</Text>
                    </Pressable>

                    <Text style={{
                        fontSize: 28,
                        color: '#2c2c2c',
                        fontWeight: 'bold',
                        marginBottom: 10,
                        textAlign: 'center'
                    }}>
                        Galería de cortes
                    </Text>

                    <Text style={{
                        fontSize: 14,
                        color: '#666',
                        textAlign: 'center',
                        marginBottom: 20
                    }}>
                        Explora nuestros estilos más populares
                    </Text>

                    <ScrollView
                        style={styles.ViewTituloCorte}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Sección Cortes Clásicos */}
                        <Text style={{
                            fontSize: 22,
                            color: '#2c2c2c',
                            fontWeight: 'bold',
                            marginBottom: 5,
                            textAlign: 'center'
                        }}>
                            ✂️ Cortes Clásicos
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            color: '#666',
                            textAlign: 'center',
                            marginBottom: 15
                        }}>
                            Estilos atemporales que nunca pasan de moda
                        </Text>
                        <View style={styles.Galeria}>
                            <FlatList
                                data={imagenesCortesClasicos}
                                renderItem={RenderItemGaleria}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={3}
                                contentContainerStyle={{ padding: 5 }}
                                scrollEnabled={false}
                            />
                        </View>

                        {/* Separador sutil */}
                        <View style={styles.SeparadorSeccion} />

                        {/* Sección Cortes Degradados */}
                        <Text style={{
                            fontSize: 22,
                            color: '#2c2c2c',
                            fontWeight: 'bold',
                            marginBottom: 5,
                            textAlign: 'center'
                        }}>
                            🔥 Cortes Degradados
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            color: '#666',
                            textAlign: 'center',
                            marginBottom: 15
                        }}>
                            Modernos y con personalidad
                        </Text>
                        <View style={styles.Galeria}>
                            <FlatList
                                data={imagenesCortesDegradados}
                                renderItem={RenderItemGaleria}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={3}
                                contentContainerStyle={{ padding: 5 }}
                                scrollEnabled={false}
                            />
                        </View>

                        {/* Separador sutil */}
                        <View style={styles.SeparadorSeccion} />

                        {/* Sección Cortes Populares */}
                        <Text style={{
                            fontSize: 22,
                            color: '#2c2c2c',
                            fontWeight: 'bold',
                            marginBottom: 5,
                            textAlign: 'center'
                        }}>
                            ⭐ Cortes Populares
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            color: '#666',
                            textAlign: 'center',
                            marginBottom: 15
                        }}>
                            Los favoritos de nuestros clientes
                        </Text>
                        <View style={styles.Galeria}>
                            <FlatList
                                data={imagenesCortesDegradados}
                                renderItem={RenderItemGaleria}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={3}
                                contentContainerStyle={{ padding: 5 }}
                                scrollEnabled={false}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}


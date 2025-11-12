import React from "react"
import { useModal } from "@packages/hooks";
import { styles } from "./Modal.styles";
import { imagenesCortesClasicos, imagenesCortesDegradados } from '../../../utils/imagenesTest/imagenes'
import { RenderItemGaleria } from "./../../../utils/imagenesTest/imagenes";
import { View, Text, Image, Pressable, Modal, FlatList, ScrollView } from 'react-native'

interface ModalGaleriaProps {
    modalVisible: boolean;
    closeModal: () => void;
}
export default function ModalGaleria({ modalVisible, closeModal }: ModalGaleriaProps) {
    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.ViewPrincipalModalGaleria}>
                {/* Botón cerrar elegante */}
                <Pressable
                    style={styles.BotonCerrarModal}
                    onPress={closeModal}
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
    )
}


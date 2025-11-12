import { View, Text, Image, ScrollView, Animated, TouchableOpacity, Alert, Modal } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import styles from "./publicaciones.styles";
import React from "react";
import { useFeedAnimations } from "@packages/hooks";

export default function FeedPrincipal() {
    const {
        botonComentario,
        botonCompartir,
        visible,
        setVisible,
        selectedPost,
        setSelectedPost,
        animacionIcono,
    } = useFeedAnimations();

    const PublicacionItem = ({ index }: { index?: number }) => (
        <View style={styles.contenedor_hijo}>
            <View style={styles.logotipo}>
                <Image
                    source={{ uri: 'https://static.wikia.nocookie.net/shingeki-no-kyojin/images/e/ea/Eren_Jaeger_-_Anime.png/revision/latest?cb=20190429004402&path-prefix=es' }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
            </View>
            <View style={styles.perfil_publicacion}>
                <Text style={styles.titulo_perfil}>Eren {index ? `#${index}` : ''}</Text>
            </View>
            <View style={styles.imagen_publicacion}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/736x/cf/84/65/cf84656b1305b350d4c773956a001c27.jpg' }}
                    style={{ width: '100%', height: 385 }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.view_iconos}>
                <TouchableOpacity onPress={() => { animacionIcono(botonComentario); setVisible(true) }}>
                    <Animated.View style={{ transform: [{ scale: botonComentario }] }}>
                        <FontAwesome name="comment" size={30} color="white" />
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => animacionIcono(botonCompartir)}>
                    <Animated.View style={{ transform: [{ scale: botonCompartir }] }}>
                        <FontAwesome name="share" size={30} color="white" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={styles.contenedorDescripcion}>
                <Text style={styles.descripcion}>Descripcion de prueba</Text>
            </View>
        </View>
    );
    return (
        <>
            <ScrollView
                style={styles.Contenedor_Principal_Publicaciones_ScrollView}
                contentContainerStyle={styles.Contenedor_Principal_Publicaciones}
                showsVerticalScrollIndicator={false}
            >
                <PublicacionItem index={1} />
                <PublicacionItem index={2} />
                <PublicacionItem index={3} />
                <PublicacionItem index={4} />
                <PublicacionItem index={5} />
            </ScrollView>

            {/* Modal único */}
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>
                            Comentarios de Publicación #{selectedPost}
                        </Text>
                        <ScrollView style={{ maxHeight: 300 }}>
                            <Text>Comentario 1...</Text>
                            <Text>Comentario 2...</Text>
                            <Text>Comentario 3...</Text>
                            <Text>Comentario 4...</Text>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.closeBtn}
                        >
                            <Text style={{ color: "#fff" }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}
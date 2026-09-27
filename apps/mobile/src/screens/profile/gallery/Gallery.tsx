import React, { useState } from "react";
import { View, Text, FlatList, Modal, Button, TouchableOpacity, Image, ListRenderItem } from "react-native";
import { styles } from "./Gallery.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGalleryViewer } from "@packages/hooks";//Import nuevo para uso del hook en turborepo

type Props = {
    images?: string[];
    numColumns?: number;
}
 
export default function Gallerry({images = [], numColumns = 3}: Props) {
//_____________________________hook importado desde packages___________________________________
    const {
        visible,
        activeIndex,
        open,
        close,
        next,
        prev,
    } = useGalleryViewer(images, true);
//_____________________________________________________________________________________________
//hook local que se quito para no contaminar logica, notar el uso que se le da en el componente
//_____________________________________________________________________________________________
    // const [visible, setVisible] = useState(false);
    // const [activeIndex, setActiveIndex] = useState(0);

    // const open = (index: number) => {
    //     setActiveIndex(index);
    //     setVisible(true);
    // }

    // const close = () => setVisible(false);

    // const next = () => setActiveIndex((i) => (i + 1) % images.length);
    // const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
//_____________________________________________________________________________________________
    const renderItem: ListRenderItem<string> = ({ item, index }) => (
        <TouchableOpacity onPress={() => open(index)} activeOpacity={0.8}>
            <Image source={{uri: item}} style={styles.gridImage}/>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList 
                data={images}
                keyExtractor={(_, i) => String(i)}
                renderItem={renderItem}
                numColumns={numColumns}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
            />
            <Modal visible={visible} transparent={false} onRequestClose={close} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalTopRow}>
                        <Button title="Cerrar" onPress={close}></Button>
                    </View>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.navButtonLeft} onPress={prev}>
                            <Text style={styles.navText}>{'<'}</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: images[activeIndex] }} style={styles.fullImage}/>
                        <TouchableOpacity style={styles.navButtonRight} onPress={next}>
                            <Text style={styles.navText}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}
import { useRef, useState } from "react";
import { Animated } from "react-native";

export const useFeedAnimations = () => {
    const botonComentario = useRef(new Animated.Value(1)).current;
    const botonCompartir = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<number | null>(null);

    const animacionIcono = (scaleValue: Animated.Value) => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return {
        botonComentario,
        botonCompartir,
        visible,
        setVisible,
        selectedPost,
        setSelectedPost,
        animacionIcono,
    };
};   
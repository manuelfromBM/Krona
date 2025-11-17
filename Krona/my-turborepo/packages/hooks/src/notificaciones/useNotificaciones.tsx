import { useState, useRef } from "react";
import { Animated } from "react-native";

const useAcordionBtn = () => {

    const [open, setOpen] = useState(false);

    // Valor animado que controla la altura (0 = cerrado, 100 = abierto)
    const alturaAnimacion = useRef(new Animated.Value(0)).current
    // para la rotacion del icono de flecha
    const rotacionFlecha = useRef(new Animated.Value(0)).current

    const toggle = () => {
        //el '?' es un operador ternario(if-else), si es true, toma el primer valor, osea 0 y si es false el segundo valor
        const toHeight = open ? 0 : 150; // Altura en pixeles
        const toRotate = open ? 0 : 1;   // 0 = 0deg, 1 = 180deg(deg es la abreviatura de grados)

        // parallel es para ejecutar varias animaciones al mismo tiempo
        Animated.parallel([
            //Para animar la altura
            Animated.timing(alturaAnimacion, {
                toValue: toHeight,
                duration: 300,
                useNativeDriver: false
            }),
            //Para animar la rotacion
            Animated.timing(rotacionFlecha, {
                toValue: toRotate,
                duration: 300,
                useNativeDriver: false
            })
        ]).start();
        setOpen(!open)
    };
    const rotacion = rotacionFlecha.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return {
        open,
        toggle,
        alturaAnimacion,
        rotacion
    }

}

export default useAcordionBtn

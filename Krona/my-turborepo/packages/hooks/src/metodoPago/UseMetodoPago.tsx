import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native"; 

export default function useMetodoPago() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const { titulo, precio } = route.params || {};
    const [loading, setLoading] = useState(false);
    
    const handleConfirmarPago = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert("Error","Pago realizado con éxito");
            navigation.goBack();
        }, 1500);
    };
    
    return {
        titulo,
        precio,
        loading,
        handleConfirmarPago,
        navigation,
    };
};
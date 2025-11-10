import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp  } from "@react-navigation/stack";

export const useForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation<StackNavigationProp<any>>();

    const validarCorreo = (email: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    };

    const handleRecover = () => {
        if(!email) {
            Alert.alert("Error","Por favor tu correo electronico");
            return;
        }

        if(!validarCorreo(email)) {
            Alert.alert("Error","El correo no es valido");
            return;
        }

        Alert.alert(
            "Correo enviado",
            "Se ha enviado un enlace de recuperacion a tu correo.",
            [{ text: "OK", onPress: () => navigation.navigate("codeVerification")}]
        );
    };

    return {
        email,
        setEmail,
        handleRecover,
        navigation,
    };
};
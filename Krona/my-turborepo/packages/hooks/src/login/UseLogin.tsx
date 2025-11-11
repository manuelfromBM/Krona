import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function useLogin() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
       Keyboard.dismiss();

       if(!email || !password) {
        Alert.alert("Error","Complete todo los campos");
        return;
       }

       if (email === "tulon@gmail.com" && password === "123456") {
        Alert.alert("Éxito","¡Bienvenido TULON!");
        navigation.navigate("Feed");
       } else {
        Alert.alert("Error","Correo o contraseña incorrectos");
       }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        navigation,
    };
}
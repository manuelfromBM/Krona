import { useState } from "react";
import { Alert } from "react-native";

 export default function useRegister (navigation: any) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // validamos el correo con una validacion simple
    const  validarCorreo = (email: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    };
    
    // aca validamos los campos vacios
    const handleRegister = () => {
        if (!nombre || !correo || !password || !confirmPassword) {
            Alert.alert("Error","Todo los campos son obligatorios");
            return;
        }

        if(!validarCorreo(correo)) {
            Alert.alert("Error","El correo no es valido");
            return;
        };
        
        if(password !== confirmPassword) {
            Alert.alert("Error","Las contraseñas no coinciden!!")
            return;
        };

        // si todo sale bien muestra un mensaje con  EXITO!
        Alert.alert("Exito", "Registro completado")
        navigation.navigate("Login");
    };

    return {
        nombre,
        setNombre,
        correo,
        setCorreo,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleRegister,
    };
};
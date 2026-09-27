import { useContext, useState, useCallback } from "react";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import { AuthContext } from "apps/mobile/src/context/AuthContext"
import { AuthContext } from "../context/AuthContext";

type Credentials = { email: string, password: string };

export default function useLogin() {
    //const navigation = useNavigation<any>();
    const { signIn } = useContext(AuthContext);
    const [ email, setEmail] = useState<string>("");
    const [ password, setPassword] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleLogin = useCallback(async () => {
        //console.log("Ejecutado");
        setError(null);
        setLoading(true);
        try {
            if (!email || !password) {
                throw new Error("Please enter email and passwaord")
            }
            await signIn({ email, password });
            console.log("signIn terminado");
        } catch (e: any) {
            //console.log("ERROR EN SIGNIN:", e);
            setError(e.message ?? "Login Failed")
        } finally {
            setLoading(false);
        }
    }, [email, password, signIn]);

    // const handleLogin = () => {
    //    Keyboard.dismiss();

    //    if(!email || !password) {
    //     Alert.alert("Error","Complete todo los campos");
    //     return;
    //    }

    //    if (email === "tulon@gmail.com" && password === "123456") {
    //     Alert.alert("Éxito","¡Bienvenido TULON!");
    //     navigation.navigate("Feed");
    //    } else {
    //     Alert.alert("Error","Correo o contraseña incorrectos");
    //    }
    // };
    // console.log("signIn in useLogin:", signIn);

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
    };
};
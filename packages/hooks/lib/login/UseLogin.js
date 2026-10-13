import { useContext, useState, useCallback } from "react";
//import { AuthContext } from "apps/mobile/src/context/AuthContext"
import { AuthContext } from "../context/AuthContext";
export default function useLogin() {
    //const navigation = useNavigation<any>();
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleLogin = useCallback(async () => {
        var _a;
        //console.log("Ejecutado");
        setError(null);
        setLoading(true);
        try {
            if (!email || !password) {
                throw new Error("Please enter email and passwaord");
            }
            await signIn({ email, password });
            console.log("signIn terminado");
        }
        catch (e) {
            //console.log("ERROR EN SIGNIN:", e);
            setError((_a = e.message) !== null && _a !== void 0 ? _a : "Login Failed");
        }
        finally {
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
}
;
//# sourceMappingURL=UseLogin.js.map
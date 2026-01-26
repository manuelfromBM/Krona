import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "src/screens/login/Login";
import { Register } from "src/screens/register/Register";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
    return(
        <Stack.Navigator id="">
            <Stack.Screen name="Login" component={Login} options={{ title: "Login"}}/>
            <Stack.Screen name="Register" component={Register} options={{ title: "Registrarse"}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;
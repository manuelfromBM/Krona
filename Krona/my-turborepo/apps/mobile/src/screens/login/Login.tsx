import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Keyboard } from "react-native";
import { styles } from "./Login.styles";
import { useLogin } from "@packages/hooks";

export const Login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    navigation,
  } = useLogin();

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {/* LOGO */}
      <Image
        source={require("../../../assets/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* CAMPOS */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#7c7a7aff"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* BOTÓN LOGIN */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* OLVIDASTE CONTRASEÑA */}
      <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </Pressable>

      {/* SEPARADOR */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>O</Text>
        <View style={styles.line} />
      </View>

      {/* BOTÓN REGISTRO */}
      <Pressable style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate</Text>
        </Text>
      </Pressable>

      {/* POLÍTICAS */}
      <Text style={styles.policyText}>
        Al registrarte, aceptas nuestras{" "}
        <Text style={styles.link}>Políticas de Privacidad</Text> y{" "}
        <Text style={styles.link}>Términos de uso</Text>.
      </Text>
    </Pressable>
  );
};

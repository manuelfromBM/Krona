import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { styles } from "./ForgotPassword.styles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useForgotPassword } from "@packages/hooks";

export const ForgotPassword: React.FC = () => {
   const {
    email,
    setEmail,
    handleRecover,
    navigation
  } = useForgotPassword();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.description}>
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#7c7a7aff"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Pressable style={styles.button} onPress={handleRecover}>
        <Text style={styles.buttonText}>Enviar enlace</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.backText}>Volver al inicio de sesión</Text>
      </Pressable>
    </View>
  );
};

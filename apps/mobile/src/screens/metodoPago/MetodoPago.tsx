import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { CreditCard, ArrowLeft, PlusCircle } from "lucide-react-native";
import { styles } from "./MetodoPago.styles";
import { useMetodoPago } from "@packages/hooks";

export default function MetodoPago() {
  const {
    titulo,
    precio,
    loading,
    handleConfirmarPago,
    navigation
  } = useMetodoPago();

  return (
    <View style={styles.container}>
      {/* Botón Volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color="#007AFF" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Método de Pago</Text>

      {/* Resumen del servicio */}
      {titulo && (
        <Text style={styles.subtitle}>
          Servicio: <Text style={{ fontWeight: "bold" }}>{titulo}</Text>{"\n"}
          Total: ${precio?.toLocaleString()}
        </Text>
      )}

      {/* Tarjeta disponible */}
      <TouchableOpacity style={styles.cardOption}>
        <CreditCard size={20} color="#007AFF" />
        <Text style={styles.cardText}>Visa terminada en 4242</Text>
      </TouchableOpacity>

      {/* Agregar nueva tarjeta */}
      <TouchableOpacity
        style={styles.addCard}
        onPress={() => navigation.navigate("AgregarTarjeta" as never)}
      >
        <PlusCircle size={20} color="#007AFF" />
        <Text style={styles.addCardText}>Agregar nueva tarjeta</Text>
      </TouchableOpacity>

      {/* Botón de pago */}
      <TouchableOpacity
        style={[styles.payButton, loading && { opacity: 0.7 }]}
        onPress={handleConfirmarPago}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payText}>Confirmar Pago</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

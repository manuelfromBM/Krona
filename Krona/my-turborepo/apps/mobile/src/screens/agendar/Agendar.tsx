import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Asegúrate de tener esta dependencia instalada: pnpm add @react-native-community/datetimepicker
import { Ionicons } from "@expo/vector-icons";
import { ArrowLeft } from "lucide-react-native";  // Asegúrate de tener esta dependencia instalada: pnpm add lucide-react-native
import { styles } from "../agendar/Agendar.styles";
import { useAgendar } from "@packages/hooks";

export default function Agendar(){
  const {
    navigation,
    servicio,
    setServicio,
    fecha,
    mostrarPicker,
    modo,
    seleccionarFecha,
    abrirPicker,
    handleConfirmar,
    Platform
  } = useAgendar();

  return (
    <View style={styles.container}>
      {/*  Botón Volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color="#007AFF" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      {/*  Título */}
      <Text style={styles.title}>Agendar Servicio</Text>
      <Text style={styles.subtitle}>
        Selecciona el servicio y la fecha para tu cita
      </Text>

      {/*  Campo de servicio */}
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Mantención, cambio de aceite..."
        placeholderTextColor="#777"
        value={servicio}
        onChangeText={setServicio}
      />

      {/*  Selector de fecha */}
      <TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker("date")}>
        <Ionicons name="calendar-outline" size={22} color="#fff" />
        <Text style={styles.pickerText}>Seleccionar fecha</Text>
      </TouchableOpacity>

      {/*  Selector de hora */}
      <TouchableOpacity style={styles.pickerButton} onPress={() => abrirPicker("time")}>
        <Ionicons name="time-outline" size={22} color="#fff" />
        <Text style={styles.pickerText}>Seleccionar hora</Text>
      </TouchableOpacity>

      {/*  Texto seleccionado */}
      <Text style={styles.selectedText}>
        {`${fecha.toLocaleDateString()}  ${fecha.toLocaleTimeString()}`}
      </Text>

      {/*  DateTimePicker */}
      {mostrarPicker && (
        <DateTimePicker
          value={fecha}
          mode={modo}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={seleccionarFecha}
        />
      )}

      {/* Botón confirmar */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
        <Text style={styles.confirmText}>Confirmar Agendamiento</Text>
      </TouchableOpacity>
    </View>
  );
}

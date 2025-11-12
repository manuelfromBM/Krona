import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const useAgendar = () => {
  const navigation = useNavigation();
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [modo, setModo] = useState<"date" | "time">("date");

  const seleccionarFecha = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || fecha;
    setMostrarPicker(false);
    setFecha(currentDate);
  };

  const abrirPicker = (mode: "date" | "time") => {
    setModo(mode);
    setMostrarPicker(true);
  };

  const handleConfirmar = () => {
    if (!servicio.trim()) {
      Alert.alert("Error", "Por favor, ingresa el tipo de servicio.");
      return;
    }

    Alert.alert(
      "Agendado con éxito",
      `Servicio: ${servicio}\nFecha: ${fecha.toLocaleDateString()}\nHora: ${fecha.toLocaleTimeString()}`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return {
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
  };
};

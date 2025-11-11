import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
/**
 * Hook personalizado para gestionar la lógica de agendamiento de servicios
 * @returns Objeto con estados y funciones para el agendamiento
 */
export const useAgendar = () => {
    const navigation = useNavigation();
    // Estado para almacenar el tipo de servicio seleccionado
    const [servicio, setServicio] = useState("");
    // Estado para la fecha y hora seleccionada
    const [fecha, setFecha] = useState(new Date());
    // Estados para controlar la visibilidad y modo del selector de fecha
    const [mostrarPicker, setMostrarPicker] = useState(false);
    const [modo, setModo] = useState("date");
    /**
     * Maneja la selección de fecha y hora
     * @param event Evento del picker
     * @param selectedDate Fecha seleccionada
     */
    const seleccionarFecha = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setMostrarPicker(false);
        // Validar que la fecha no sea anterior a la actual
        if (currentDate < new Date()) {
            Alert.alert("Error", "No puedes seleccionar una fecha pasada");
            return;
        }
        setFecha(currentDate);
    };
    /**
     * Abre el selector de fecha o hora
     * @param mode Modo del picker (date | time)
     */
    const abrirPicker = (mode) => {
        setModo(mode);
        setMostrarPicker(true);
    };
    /**
     * Maneja la confirmación del agendamiento
     */
    const handleConfirmar = () => {
        // Validaciones
        if (!servicio.trim()) {
            Alert.alert("Error", "Por favor, ingresa el tipo de servicio.");
            return;
        }
        // Validar horario de atención (ejemplo: 8:00 AM a 6:00 PM)
        const hora = fecha.getHours();
        if (hora < 8 || hora >= 18) {
            Alert.alert("Error", "El horario de atención es de 8:00 AM a 6:00 PM");
            return;
        }
        // Validar que sea día laboral (Lun-Vie)
        const dia = fecha.getDay();
        if (dia === 0 || dia === 6) {
            Alert.alert("Error", "Solo se pueden agendar citas de lunes a viernes");
            return;
        }
        Alert.alert("Agendado con éxito", `Servicio: ${servicio}\nFecha: ${fecha.toLocaleDateString()}\nHora: ${fecha.toLocaleTimeString()}`, [{ text: "OK", onPress: () => navigation.goBack() }]);
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
//# sourceMappingURL=UseAgendar.js.map
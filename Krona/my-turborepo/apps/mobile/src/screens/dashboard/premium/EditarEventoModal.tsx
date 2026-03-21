import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Alert, Modal } from "react-native";
import { calendarStyles as styles } from "./CalendarView.styles";
import { CalendarioEvento } from "@packages/hooks/src/dashboard/useDashboardPremiumCalendarioData";

interface Props {
  visible: boolean;
  onClose: () => void;
  eventoEditado: CalendarioEvento;
  weekDays: Date[];
  horasDelDia: string[];
  eventos: CalendarioEvento[];
  onGuardar: (eventoActualizado: CalendarioEvento) => void;
}

export const EditarEventoModal: React.FC<Props> = ({
  visible,
  onClose,
  eventoEditado,
  weekDays,
  horasDelDia,
  eventos,
  onGuardar,
}) => {
  const [nuevaFecha, setNuevaFecha] = useState<Date>(eventoEditado.fecha);
  const [nuevaHora, setNuevaHora] = useState<string>(eventoEditado.horaInicio);
  const [nuevaDuracion, setNuevaDuracion] = useState<number>(eventoEditado.duracion);

  // 🔥 Sincroniza cuando cambia el evento seleccionado
  useEffect(() => {
    setNuevaFecha(eventoEditado.fecha);
    setNuevaHora(eventoEditado.horaInicio);
    setNuevaDuracion(eventoEditado.duracion);
  }, [eventoEditado]);

  // 🔥 Horas disponibles para la fecha seleccionada
  const horasDisponibles = useMemo(() => {
    return horasDelDia.filter(
      (hora) =>
        !eventos.some(
          (e) =>
            e.fecha.toDateString() === nuevaFecha.toDateString() &&
            e.horaInicio === hora &&
            e.id !== eventoEditado.id
        )
    );
  }, [nuevaFecha, horasDelDia, eventos, eventoEditado.id]);

  const guardarCambios = () => {
    Alert.alert(
      "Guardar cambios",
      "¿Deseas guardar los cambios del evento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            const eventoActualizado: CalendarioEvento = {
              ...eventoEditado,
              fecha: nuevaFecha,
              horaInicio: nuevaHora,
              duracion: nuevaDuracion,
            };

            onGuardar(eventoActualizado);
            onClose();

            Alert.alert(
              "Evento actualizado",
              "La fecha, hora y duración se actualizaron correctamente."
            );
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar fecha y hora</Text>

          {/* ======================= SELECCIONAR FECHA ======================= */}
          <Text style={styles.label}>Selecciona nueva fecha:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 12 }}
          >
            {weekDays.map((day) => {
              const horasDisponiblesDia = horasDelDia.filter(
                (hora) =>
                  !eventos.some(
                    (e) =>
                      e.fecha.toDateString() === day.toDateString() &&
                      e.horaInicio === hora &&
                      e.id !== eventoEditado.id
                  )
              );

              const isFull = horasDisponiblesDia.length === 0;
              const isSelected =
                nuevaFecha.toDateString() === day.toDateString();

              return (
                <Pressable
                  key={day.toISOString()}
                  onPress={() => !isFull && setNuevaFecha(day)}
                  style={[
                    styles.dateSlot,
                    isSelected && styles.dateSlotSelected,
                    isFull && { opacity: 0.3 },
                  ]}
                >
                  <Text>{day.getDate()}</Text>
                  <Text>
                    {day.toLocaleDateString("es-CL", {
                      weekday: "short",
                    })}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ======================= SELECCIONAR HORA ======================= */}
          <Text style={styles.label}>Selecciona hora:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {horasDelDia.map((hora) => {
              const isOcupada = !horasDisponibles.includes(hora);
              const isSelected = nuevaHora === hora;

              return (
                <Pressable
                  key={hora}
                  onPress={() => !isOcupada && setNuevaHora(hora)}
                  style={[
                    styles.hourSlot,
                    isSelected && styles.hourSlotSelected,
                    isOcupada && { opacity: 0.3 },
                  ]}
                >
                  <Text
                    style={[
                      styles.hourText,
                      isSelected && styles.hourTextSelected,
                    ]}
                  >
                    {hora}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ======================= SELECCIONAR DURACIÓN ======================= */}
          <Text style={styles.label}>Duración:</Text>
          <View style={styles.durationRow}>
            {[30, 45, 60, 90].map((min) => {
              const isSelected = nuevaDuracion === min;

              return (
                <Pressable
                  key={min}
                  onPress={() => setNuevaDuracion(min)}
                  style={[
                    styles.durationBtn,
                    isSelected && styles.durationSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.durationText,
                      isSelected && styles.durationTextSelected,
                    ]}
                  >
                    {min} min
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* ======================= BOTONES ======================= */}
          <View style={styles.formActions}>
            <Pressable style={styles.saveBtn} onPress={guardarCambios}>
              <Text style={styles.saveText}>Guardar cambios</Text>
            </Pressable>

            <Pressable style={styles.cancelEditBtn} 
              onPress={onClose}>
              <Text>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
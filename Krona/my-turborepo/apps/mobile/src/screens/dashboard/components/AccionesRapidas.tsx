import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../premium/DashboardPremium.styles";

interface Props {
  tasaCancelacion: number;
  totalPendiente: number;
  totalCobrado: number;
  metaMensual: number;
  userQuestion: string;
  setUserQuestion: (value: string) => void;
  iaAnswer: string;
  handleAskIA: () => void;
}

export const AsistenteIACard = ({
  tasaCancelacion,
  totalPendiente,
  totalCobrado,
  metaMensual,
  userQuestion,
  setUserQuestion,
  iaAnswer,
  handleAskIA,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>🤖 Asistente IA</Text>

      <Text style={styles.item}>
        Cancelaciones: {Math.round(tasaCancelacion)}%
      </Text>
      <Text style={styles.item}>
        Pendiente: ${totalPendiente.toLocaleString("es-CL")}
      </Text>
      <Text style={styles.item}>
        Cobrado: ${totalCobrado.toLocaleString("es-CL")}
      </Text>

      <TextInput
        placeholder="Pregunta a la IA..."
        value={userQuestion}
        onChangeText={setUserQuestion}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleAskIA}>
        <Text style={styles.buttonText}>Preguntar</Text>
      </TouchableOpacity>

      {iaAnswer ? <Text style={styles.iaAnswer}>{iaAnswer}</Text> : null}
    </View>
  );
};
import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./AgregarTarjeta.styles";
import { useAgregarTarjeta } from "@packages/hooks";

export default function AgregarTarjeta() {
    const {
    navigation,
    paymentType, setPaymentType,
    cardName, setCardName,
    cardNumber, onChangeCardNumber,
    expiry, onChangeExpiry,
    cvv, onChangeCvv,
    rut, onChangeRut,
    email, setEmail,
    loading,
    handleGuardar
  } = useAgregarTarjeta();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#007AFF" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Payment Details</Text>

      {/* selector tipo pago */}
      <View style={styles.radioRow}>
        <TouchableOpacity
          style={[
            styles.radioOption,
            paymentType === "credit" && styles.radioOptionActive,
          ]}
          onPress={() => setPaymentType("credit")}
        >
          <View style={styles.radioDot}>
            {paymentType === "credit" && <View style={styles.radioDotInner} />}
          </View>
          <Text style={styles.radioLabel}>Tarjeta Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioOption,
            paymentType === "debit" && styles.radioOptionActive,
          ]}
          onPress={() => setPaymentType("debit")}
        >
          <View style={styles.radioDot}>
            {paymentType === "debit" && <View style={styles.radioDotInner} />}
          </View>
          <Text style={styles.radioLabel}>Tarjeta Débito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioOption,
            paymentType === "other" && styles.radioOptionActive,
          ]}
          onPress={() => setPaymentType("other")}
        >
          <View style={styles.radioDot}>
            {paymentType === "other" && <View style={styles.radioDotInner} />}
          </View>
          <Text style={styles.radioLabel}>Otros</Text>
        </TouchableOpacity>
      </View>

      {/* tarjeta visual */}
      <View style={styles.cardPreview}>
        <View style={styles.cardChip} />
        <Text style={styles.cardNumberPreview}>
          {cardNumber || "0000 0000 0000 0000"}
        </Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardNamePreview}>{cardName || "CARDHOLDER NAME"}</Text>
          <Text style={styles.cardExpiryPreview}>{expiry || "MM/AA"}</Text>
        </View>
      </View>

      {/* formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del titular</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre tal cual en la tarjeta"
          placeholderTextColor="#999"
          value={cardName}
          onChangeText={setCardName}
        />

        <Text style={[styles.label, { marginTop: 8 }]}>Número de tarjeta</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={onChangeCardNumber}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              value={expiry}
              onChangeText={onChangeExpiry}
              maxLength={5}
            />
          </View>

          <View style={{ width: 110 }}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={onChangeCvv}
              maxLength={4}
            />
          </View>
        </View>

        <Text style={[styles.label, { marginTop: 8 }]}>RUT</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 12345678K"
          placeholderTextColor="#999"
          value={rut}
          onChangeText={onChangeRut}
        />

        <Text style={[styles.label, { marginTop: 8 }]}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.7 }]}
          onPress={handleGuardar}
          disabled={loading}
        >
          <Text style={styles.saveText}>{loading ? "Guardando..." : "Guardar tarjeta"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

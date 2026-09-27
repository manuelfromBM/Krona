import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useAgregarTarjeta = () => {
  const navigation = useNavigation();

  const [paymentType, setPaymentType] = useState<"credit" | "debit" | "other">("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumberRaw, setCardNumberRaw] = useState("");
  const [expiryRaw, setExpiryRaw] = useState("");
  const [cvv, setCvv] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const cardNumber = useMemo(() => formatCardNumber(cardNumberRaw), [cardNumberRaw]);
  const expiry = useMemo(() => formatExpiry(expiryRaw), [expiryRaw]);

  const onChangeCardNumber = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setCardNumberRaw(digits.slice(0, 16));
  };

  const onChangeExpiry = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setExpiryRaw(digits.slice(0, 4));
  };

  const onChangeCvv = (text: string) => {
    const digits = text.replace(/\D/g, "");
    setCvv(digits.slice(0, 4));
  };

  const onChangeRut = (text: string) =>
    setRut(text.replace(/[^0-9kK]/g, "").slice(0, 12));

  const handleGuardar = () => {
    if (!cardName.trim()) return Alert.alert("Error", "Ingresa el nombre del titular.");
    if (cardNumberRaw.length < 13) return Alert.alert("Error", "Número de tarjeta incompleto.");
    if (expiryRaw.length !== 4) return Alert.alert("Error", "Fecha de expiración inválida.");
    if (cvv.length < 3) return Alert.alert("Error", "CVV inválido.");
    if (!rut.trim()) return Alert.alert("Error", "Ingresa RUT.");
    if (!isValidEmail(email)) return Alert.alert("Error", "Correo inválido.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Éxito", "Tarjeta agregada correctamente.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return {
    navigation,
    paymentType,
    setPaymentType,
    cardName, setCardName,
    cardNumber, onChangeCardNumber,
    expiry, onChangeExpiry,
    cvv, onChangeCvv,
    rut, onChangeRut,
    email, setEmail,
    loading,
    handleGuardar
  };
};

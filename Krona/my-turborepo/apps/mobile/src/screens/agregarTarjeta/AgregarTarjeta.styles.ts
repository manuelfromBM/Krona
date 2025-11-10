import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // tono oscuro para que la tarjeta resalte (ajusta si quieres)
    paddingHorizontal: 18,
    paddingTop: 40,
  },

  backButton: {
    position: "absolute",
    top: 44,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#60a5fa",
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
  },

  // radio row
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  radioOptionActive: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.14)",
  },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#60a5fa",
  },
  radioLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  // tarjeta preview
  cardPreview: {
    marginTop: 14,
    marginBottom: 18,
    backgroundColor: "#1f2937",
    borderRadius: 14,
    padding: 18,
    minHeight: 120,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    elevation: 6,
  },
  cardChip: {
    width: 44,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#f59e0b",
  },
  cardNumberPreview: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12,
  },
  cardNamePreview: {
    color: "#d1d5db",
    fontSize: 13,
  },
  cardExpiryPreview: {
    color: "#d1d5db",
    fontSize: 13,
  },

  // formulario
  form: {
    marginTop: 8,
    paddingBottom: 40,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  // boton guardar
  saveButton: {
    marginTop: 14,
    backgroundColor: "#60a5fa",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#072244",
    fontWeight: "700",
    fontSize: 16,
  },
});

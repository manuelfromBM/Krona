import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7fb" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#2c3e50" },
  addBtn: {
    backgroundColor: "#2c7be5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },

  list: { paddingHorizontal: 12, paddingBottom: 24 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  servicioImage: { width: "100%", height: 140, borderRadius: 8, marginBottom: 8 },
  servicioName: { fontSize: 16, fontWeight: "600", color: "#213547" },
  servicioPrice: { fontSize: 14, color: "#1f8a70", marginTop: 4 },

  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "#e6f2ff",
    borderRadius: 6,
    alignItems: "center",
  },
  deleteBtn: { backgroundColor: "#ffe8e8" },
  actionText: { color: "#213547", fontWeight: "600" },

  inlineRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  smallBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: "#f0f4f8",
    borderRadius: 6,
    alignItems: "center",
  },
  smallBtnText: { color: "#213547" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#e1e6ee",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});
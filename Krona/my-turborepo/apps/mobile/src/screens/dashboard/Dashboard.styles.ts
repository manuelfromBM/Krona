import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },

  /* ===================== TARJETAS DE MÉTRICAS ===================== */
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metricCard: {
    width: "48%",
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  metricLabel: {
    fontSize: 14,
    color: "#555",
  },

  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
  },

  /* ===================== TÍTULOS DE SECCIÓN ===================== */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  /* ===================== GRÁFICO ===================== */
  chart: {
    borderRadius: 12,
    marginBottom: 20,
  },

  /* ===================== SERVICIOS POPULARES ===================== */
  serviceCard: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  /* ===================== SERVICIOS MENOS PEDIDOS ===================== */
  serviceCardDanger: {
    backgroundColor: "#FFE5E5",
    borderWidth: 1,
    borderColor: "#FF7A7A",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  serviceName: {
    fontSize: 16,
    fontWeight: "600",
  },

  serviceCount: {
    color: "#666",
  },

  /* ===================== BLOQUES GRANDES ===================== */
  sectionBlock: {
    backgroundColor: "#FAFAFA",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
});

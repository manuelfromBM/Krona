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
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
  },
  serviceCard: {
    backgroundColor: "#F8F8F8",
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
});

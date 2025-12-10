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

  // Tabs DIA/SEMANA/MES 
   tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 12,
  },

  tab: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },

  tabActive: {
    backgroundColor: "#4A90E2",
  },

  tabText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  tabTextActive: {
    color: "#fff",
  },

  contentBox: {
    marginTop: 10,
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000",
  },

  // Secciones dinámicas


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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  chart: {
    borderRadius: 12,
    marginBottom: 20,
  },

  serviceCard: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

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
});

//DashboardPremium.styles.ts
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

   sectionBlock: {
    marginBottom: 30,
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

// Reemplaza metricsContainer, metricCard, metricLabel, metricValue por esto:

  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  
  // Nueva — para el Promedio/cita que va solo abajo
  metricCardFull: {
    width: "100%",
  },
  
  // Nueva — barrita de color arriba de cada card
  metricColorBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 14,
  },
  
  metricIcon: {
    fontSize: 22,
    marginBottom: 8,
    marginTop: 6,
  },
  
  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
  },
  
  metricValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

 // chart: {
 //   borderRadius: 12,
 //   marginBottom: 20,
 // },

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
  //=================================//
  // ESTILO NUEVO
  //================================//

  
  /* =======================================
     CARD RESUMEN MES PREMIUM
  ======================================= */

  monthSummaryCard: {
    marginTop: 25,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },

  monthSummaryLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },

  monthSummaryMoney: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    marginTop: 4,
  },

  monthPending: {
    marginTop: 4,
    fontSize: 13,
    color: "#F59E0B",
    fontWeight: "600",
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    marginTop: 14,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 8,
    backgroundColor: "#22C55E",
    borderRadius: 6,
  },

  monthStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  /* ===============================
     FINANCIAL SUMMARY CARD
  ================================ */
  
  financialCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },
  
  financialTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111827",
  },
  
  financialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  
  financialLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  
  financialIncome: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16A34A",
  },
  
  financialLoss: {
    fontSize: 14,
    fontWeight: "700",
    color: "#EF4444",
  },
  
  financialDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  
  financialTotalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  
  financialTotal: {
    fontSize: 16,
    fontWeight: "800",
  },

  /* ===============================
   OBSERVACIONES AUTOMÁTICAS
  ================================ */
  
  observacionesCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
  
    borderWidth: 1.5,
    borderColor: "#1F2937", // borde oscuro elegante
  },
  
  observacionesTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 12,
    color: "#111827",
  },
  
  observacionItem: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 18,
  },

  /* ===============================
   ALERTA DEL MES 
  ================================ */
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
},

cardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
},

cardTitle: {
  fontSize: 14,
  fontWeight: "600",
},

rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 6,
},

item: {
  fontSize: 12,
  color: "#374151",
},

chart: {
  marginTop: 10,
  height: 100,
  backgroundColor: "#F3F4F6",
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
},

// Al final del archivo DashboardPremium.styles.ts

/* ===============================
   MODAL STYLES
  ================================ */
  
modalBackground: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
},

modalContent: {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 12,
  width: "80%", // Ajusta el tamaño del modal
  elevation: 5, // Sombra para darle profundidad
},

modalTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#333",
  marginBottom: 12,
},

modalDescription: {
  fontSize: 14,
  color: "#555",
  marginBottom: 20,
},

modalCloseButton: {
  backgroundColor: "#3B82F6",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
},

modalCloseButtonText: {
  color: "#fff",
  fontWeight: "600",
},

/* ===============================
   ASISTENTE IA CARD
================================ */

input: {
  marginTop: 10,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 10,
  padding: 10,
  fontSize: 13,
  backgroundColor: "#F9FAFB",
},

button: {
  marginTop: 10,
  backgroundColor: "#3B82F6",
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: "center",
},

buttonText: {
  color: "#FFF",
  fontWeight: "600",
  fontSize: 13,
},

iaAnswer: {
  marginTop: 10,
  fontSize: 13,
  color: "#111827",
  lineHeight: 18,
},




});
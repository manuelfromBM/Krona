import { StyleSheet } from "react-native";

export const calendarStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    marginTop: 30,
  },

  /* ===========================================================
     ======================== HEADER ============================
     =========================================================== */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#1A1A1A",
  },

  arrowButton: {
    padding: 6,
    borderRadius: 10,
  },

  /* ===========================================================
     ======================= VISTA MES ==========================
     =========================================================== */

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  weekLabel: {
    width: "14%",
    textAlign: "center",
    fontWeight: "600",
    color: "#777",
    fontSize: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  emptyDay: {
    width: "14%",
    height: 45,
    marginVertical: 4,
  },

  dayViewBox: {
    width: "14%",
    height: 45,
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },

  weekDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },

  monthLoadBar: {
    width: "60%",
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },

  dayBox: {
    width: "14%",
    height: 52,
    marginVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E4",
    
    // Android
    elevation: 1,
    
    // iOS
    shadowColor: "#ad5656ff",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },


  /* HOY */
  todayBox: {
    backgroundColor: "#E8F0FE",
    borderColor: "#4285F4",
    borderWidth: 1.5,
  },

  dayNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827", // gris oscuro elegante
  },

  dayNumberMuted: {
    color: "#6B7280", // gris medio
  },

  paymentBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#F59E0B",
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  
  paymentText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  todayText: {
    color: "#4285F4",
    fontWeight: "700",
  },

  /* SELECCIONADO */
  selected: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "700",
  },

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

  /* ===========================================================
     ======================= VISTA SEMANA =======================
     =========================================================== */

  weekDayBox: {
    width: 50,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E4",
    marginHorizontal: 3,
    paddingVertical: 6,

  },

  weekDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 3,
  },

 /*codigo nuevo semana*/
  weekGrid: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 2,
},

weekCard: {
  flex: 1,
  backgroundColor: "#fff",
  marginHorizontal: 2,
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 2,
  alignItems: "center",
  elevation: 2,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  borderWidth: 1,
  borderColor: "#F3F4F6",
  minHeight: 100,
},

weekDayLabel: {
  fontSize: 9,
  color: "#6B7280",
  fontWeight: "600",
  textAlign: "center",
},

weekDayNumber: {
  fontSize: 16,
  fontWeight: "800",
  marginVertical: 4,
  color: "#111827",
},

loadIndicator: {
  width: 16,
  height: 5,
  borderRadius: 3,
  marginVertical: 4,
},

weekMoney: {
  fontSize: 9,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

weekPending: {
  fontSize: 8,
  color: "#DC2626",
  marginTop: 2,
  textAlign: "center",
  fontWeight: "600",
},
  /* ===========================================================
     ======================== VISTA DÍA =========================
     =========================================================== */
  dayTitle: {
    fontSize: 22,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 10,
  },

  dayEmpty: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },

  eventHour: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },

  eventEstado: {
    fontSize: 14,
    color: "#555",
  },

  /*codigo nuevo*/

  timeline: {
    marginTop: 10,
    },

  timeRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  timeLabel: {
    width: 55,
    fontSize: 13,
    color: "#6B7280",
  },

  emptySlot: {
    flex: 1,
    height: 48,
    borderLeftWidth: 2,
    borderLeftColor: "#E5E7EB",
  },

  eventCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    elevation: 1,
  },

  eventClient: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  eventService: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eventPrice: {
    fontSize: 13,
    fontWeight: "600",
  },

  eventStatus: {
    fontSize: 12,
    fontWeight: "700",
  },

  eventPaid: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "700",
  },

  //================================
  //========STYLE DEL MODAL=========
  //================================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },

  modalPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  modalStatus: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 20,
  },

  modalClose: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },

  modalCloseText: {
    fontWeight: "700",
  },

  modalActions: {
    marginTop: 20,
    gap: 10,
  },

  actionBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  editBtn: { backgroundColor: "#3B82F6" },
  reagendarBtn: { backgroundColor: "#F59E0B" },
  cancelBtn: { backgroundColor: "#EF4444" },
  payBtn: { backgroundColor: "#22C55E" },

  //================================
  //========MODAL EDITAR============
  //================================

  form: {
    marginTop: 20,
    gap: 10,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  
  label: {
    fontSize: 12,
    color: "#6B7280",
  },
  
  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  originalDate: {
    fontSize: 16,
    color: "#374151", // gris oscuro
    marginBottom: 8,
  },
  
  formActions: {
    marginTop: 20,
    gap: 10,
  },
  
  saveBtn: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
  
  cancelEditBtn: {
    alignItems: "center",
    padding: 10,
  },

  //================================
  //========MODAL EDITAR HORA=======
  //================================

  hourGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  hourSlot: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },

  hourSlotSelected: {
    backgroundColor: "#3B82F6",
  },

  hourText: {
    fontSize: 13,
    color: "#374151",
  },

  hourTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  durationRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  durationBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },

  durationSelected: {
    backgroundColor: "#22C55E",
  },

  durationText: {
    fontSize: 13,
    color: "#374151",
  },

  durationTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  // BOTON DE ERROR SI HAY CONFLICTO HORA
  errorText: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

/* ESTADO Y MÉTODO DE PAGO */
optionRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 6,
},

optionBtn: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  backgroundColor: "#E5E7EB",
},

optionBtnSelected: {
  backgroundColor: "#3B82F6",
},

optionText: {
  fontSize: 13,
  color: "#374151",
  fontWeight: "500",
  textTransform: "capitalize",
},

optionTextSelected: {
  color: "#fff",
  fontWeight: "700",
},

//NUEVO MODAL QUE CREE
/* Fecha individual en la selección */
dateSlot: {
  width: 60,
  height: 70,
  borderRadius: 12,
  backgroundColor: "#F3F4F6",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 8,
  borderWidth: 1,
  borderColor: "#E5E7EB",
},

/* Fecha seleccionada */
dateSlotSelected: {
  backgroundColor: "#3B82F6",
  borderColor: "#3B82F6",
},


});

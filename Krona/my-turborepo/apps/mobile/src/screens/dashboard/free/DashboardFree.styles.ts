// DashboardFree.styles.ts

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 48,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  freeBadge: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },

  freeBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 1,
  },

  // SECTION TITLE
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
    marginTop: 6,
  },

  // ROW
  row: {
    flexDirection: "row",
    gap: 10,
  },

  // CARD
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",

    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardHalf: {
    flex: 1,
  },

  cardWarning: {
    borderColor: "#FDE68A",
    backgroundColor: "#FFFBEB",
  },

  cardLocked: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    opacity: 0.75,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  cardSub: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 3,
  },

  // LOCKED CARD
  lockedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  lockIcon: {
    fontSize: 16,
  },

  lockedText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    fontStyle: "italic",
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // PROGRESS BAR
  progressBg: {
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    height: 8,
    marginBottom: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    borderRadius: 6,
  },

  // UPGRADE BOX
  upgradeBox: {
    marginTop: 16,
    padding: 24,
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    alignItems: "center",
  },

  upgradeEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },

  upgradeTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  upgradeText: {
    fontSize: 13,
    color: "#93C5FD",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },

  upgradeFeatures: {
    width: "100%",
    marginBottom: 20,
    gap: 6,
  },

  upgradeFeatureItem: {
    fontSize: 13,
    color: "#E0F2FE",
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
  },

  upgradeBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },

  upgradeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  upgradeNote: {
    marginTop: 10,
    fontSize: 11,
    color: "#CBD5E1",
  },
});

export default styles;
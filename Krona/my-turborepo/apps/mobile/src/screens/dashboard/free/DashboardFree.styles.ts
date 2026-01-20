import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  // CARD
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    elevation: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  cardValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  // UPGRADE BOX
  upgradeBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },

  upgradeTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  upgradeText: {
    color: "#444",
    marginBottom: 10,
  },

  upgradeBullet: {
    color: "#2E7D32",
    marginBottom: 4,
  },

  button: {
    marginTop: 14,
    backgroundColor: "#27AE60",
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

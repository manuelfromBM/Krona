import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f9fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#777",
    marginBottom: 26,
  },

  // CARD BASE 
  card: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  // FREE
  cardFree: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dbdbdb",
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#303632ff",
    alignSelf: "auto",
  },

  // PREMIUM
  cardPremium: {
    backgroundColor: "#1f6feb",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  cardTitlePremium: {
    color: "#fff",
  },

  cardText: {
    marginTop: 10,
    fontWeight: "700",
    fontSize: 15,
  },

  cardTextLight: {
    marginTop: 10,
    fontWeight: "700",
    fontSize: 15,
    color: "#fff",
  },

  cardTextMuted: {
    marginTop: 10,
    fontWeight: "700",
    fontSize: 15,
    color: "#999",
  },

  item: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },

  itemLight: {
    fontSize: 14,
    color: "#e9f1ff",
    marginTop: 4,
  },

  itemMuted: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },

  // BADGE PREMIUM
  badge: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    borderRadius: 6,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // BUTTON
  button: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  freeButton: {
    backgroundColor: "#2ecc71",
  },

  premiumButton: {
    backgroundColor: "#0d47a1",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});

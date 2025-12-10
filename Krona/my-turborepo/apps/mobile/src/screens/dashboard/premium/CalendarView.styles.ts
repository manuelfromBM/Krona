import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e7e7e7",
  },

  tabActive: {
    backgroundColor: "#000",
  },

  tabText: {
    color: "#555",
    fontWeight: "500",
  },

  tabTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  citaCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

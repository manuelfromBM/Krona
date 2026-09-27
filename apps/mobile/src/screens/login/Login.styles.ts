import { StyleSheet } from "react-native";
//comentario
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 25,
  },
  logo: {
    width: 160,
    height: 100,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#0095f6",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#7aa8d9" },
  error: { color: "red", marginBottom: 8 },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotText: {
    color: "#0095f6",
    marginTop: 15,
    fontSize: 14,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#555",
    fontWeight: "bold",
  },
  registerButton: {
    marginBottom: 20,
  },
  registerText: {
    fontSize: 15,
    color: "#555",
  },
  registerHighlight: {
    color: "#0095f6",
    fontWeight: "bold",
  },
  policyText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginHorizontal: 20,
  },
  link: {
    color: "#0095f6",
  },
});

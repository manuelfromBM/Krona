import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingBottom: 30,
    },
    header: {
        height: 120,
        justifyContent: "flex-end",
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    logoutBtn: {
        position: "absolute",
        right: 16,
        top: 44,
        padding: 8,
    },
    avatarWrap: {
        alignItems: "center",
        marginTop: -40,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 10/2,
        borderWidth: 3,
        borderColor: "#777",
        backgroundColor: "#eee"
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 110/2,
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: "#f2f2f2",
        alignContent: "center",
        justifyContent: "center",
    },
    avatarText: {
        marginTop: 6,
        color: "#666",
        fontSize: 12,
    },
    form: {
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    label: {
        color: "#444",
        fontSize: 13,
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: "#fff",
    },
    textarea: {
        minHeight: 78,
        textAlignVertical: "top",
    },
    
});
import {StyleSheet} from "react-native"; 

export const styles = StyleSheet.create({
    container: { 
        flex:1 ,
        padding: 16, 
        backgroundColor: "#fff" 
    },
    header: { 
        flexDirection: "row", 
        alignContent: "center"
    },
    avatar: { 
        width: 88, 
        height: 88, 
        borderRadius: 44 
    },
    name: { 
        fontSize: 20, 
        fontWeight: "700" 
    },
    handle: { 
        color:"#666" 
    },
    statsRow: { 
        flexDirection: "row", 
        justifyContent: "space-around", 
        marginTop: 20 
    },
    start: { 
        alignItems:"center" 
    },
    statNum: { 
        fontWeight: "700", 
        fontSize: 16 
    },
});
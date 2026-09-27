import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    Principal:{
       flex:1,
       backgroundColor:'#fdfdfdff', 
       justifyContent:'flex-start',
       alignItems:'center',
    },
    ViewBusqueda: {
        width:400,
        height:60,
        marginBottom:10,        
        alignContent:'center',
        justifyContent:'center',
    },
    ViewMosaico: {
        width:425,
        flexShrink:1,
    },
    Buscador: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        margin:10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ImagenesBuscarEstilos:{
        width: '33.33%',
        aspectRatio: 1,
    }
})

export default styles
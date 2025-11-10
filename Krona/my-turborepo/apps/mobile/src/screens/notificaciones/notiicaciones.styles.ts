import { StyleSheet } from "react-native";

 const styles = StyleSheet.create({
    ViewPrincipal:{
        backgroundColor:"black",
        flex:1,
        alignItems:'center'
    },
    ViewTitulo:{
        backgroundColor: '#000000ff',
        width:415,
        height:40,
        margin:10,
        alignItems:'center',
        justifyContent:'center'
    },
    ViewListaNotificacion:{
        backgroundColor: '#000000ff',
        width: 415,
        height: 600
    },
    ViewImagenLogo:{
        position:'absolute',
        top:5,
        left:5,
    },
    ViewEstadoCita:{
        position:'absolute',
        top:15,
        left:60
    },
    ViewDetalles:{

    }
})

export default styles
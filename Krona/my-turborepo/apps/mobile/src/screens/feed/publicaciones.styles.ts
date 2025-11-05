import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    Contenedor_Principal_Publicaciones_ScrollView: {
        flex: 1, 
        backgroundColor: '#0c0c0cff',
    },
    Contenedor_Principal_Publicaciones: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        minHeight: '100%',
    },
    contenedor_hijo:{
        width: 430,
        height: 550,
        backgroundColor: '#0c0c0cff',
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15, 
        marginHorizontal: 10, 
    },
    logotipo:{
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute', 
        top: 15,               
        left: 10,               
    },
    perfil_publicacion:{
        width: 250,
        height: 50,
        position: 'absolute',
        top: 15,
        left: 70,
        justifyContent: 'center',
    },
    imagen_publicacion:{
        marginTop: 5,
        width: '100%', 
        height: 385,
        resizeMode: 'cover', 
    },
    titulo_perfil:{
        fontSize: 18, 
        color: 'white',
        fontWeight: 'bold',
    },
    view_iconos:{
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 0,
        height: 50, 
        flexDirection: 'row',   
        justifyContent: 'flex-start',
        alignItems: 'center',    
        gap: 20, 
        backgroundColor: '#0c0c0cff', 
    },
    contenedorDescripcion: {
        position: 'absolute',
        bottom:5,
        left:20,
    },
    descripcion: {
        color: 'white'
    },
    overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: "30%",
    },
    closeBtn: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    },
});

export default styles;
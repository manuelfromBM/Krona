import { Bold } from "lucide-react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    titulo: {
        fontSize: 32,
        fontWeight: '800', 
        marginBottom: 24,
        marginTop: 20,
        color: '#1a1a2e',
        letterSpacing: 0.5, 
    },
    acordionContainer: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 16, 
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0', 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    subTitulo: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2d3436',
        flex: 1,
        marginRight: 10,
        lineHeight: 22, 
    },
    flecha: {
        fontSize: 14,
        color: '#0984e3',
        fontWeight: 'bold',
    },
    contenido: {
        overflow: 'hidden',
        backgroundColor: '#fafbfc', 
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    textoContenido: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        color: '#2d3436',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0', 
    },
});

export default styles
import {StyleSheet, Dimensions} from "react-native"; 

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
    },
    name: {
        fontSize: 18,
        fontWeight: '700'
    },
    handle: {
        color: '#666',
    },
    statsRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    statBox: {
        alignItems: 'center',
    },
    statNum: {
        fontWeight: '700',
        fontSize: 16,
    },
    statLabel: {
        color: '#666',
    },
    galleryWrapper: {
        width: '100%',
        marginTop: 18,
        alignItems: 'center',
    },
    sectionTitle: {
        width: '90%',
        fontWeight: '600',
        marginBottom: 8,
    },
    gridImage: {
        width: width / 3 - 6,
        height: width / 3 - 6,
        margin: 3,
        backgroundColor: '#eee',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    modalTopRow: {
        padding: 8,
        alignItems: 'flex-end',
    },
    modalContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullImage: {
        width: width * 0.9,
        height: height * 0.7,
    },
    navButtonLeft: {
        position: 'absolute',
        left: 12,
        zIndex: 10,
        padding: 12,
    },
    navButtonRight: {
        position: 'absolute',
        right: 12,
        zIndex: 10,
        padding: 12,
    },
    navText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
    },  
});
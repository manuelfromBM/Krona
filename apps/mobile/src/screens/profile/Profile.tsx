import React from 'react';
import { styles } from './Profile.styles';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gallerry from './gallery/Gallery';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


type ProfileStackParamList = {
    Profile: { userId?: string } | undefined;
    EditarPerfil: { userId?: string } | undefined;
    DashboardSelector: { userId?: string } | undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
    const images = [
        'https://media.revistagq.com/photos/5d93360c2c50100008b21511/master/w_1600%2Cc_limit/peaky%2520blinders.jpg',
        'https://www.nintenderos.com/wp-content/uploads/2025/04/Metroid-Prime-4-Beyond.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLK5S52ELxujOIe0A0pjrM6UXhqVz2HJfbzA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrkPqLdpjQqnQYtM4DuOD4x-FtZ9jRW24qA&s',
        'https://sm.pcmag.com/t/pcmag_uk/news/i/i-played-t/i-played-the-super-mario-galaxy-2-remaster-and-its-still-out_6tx4.1200.jpg',
        'https://images.ecestaticos.com/bxu0Ke3z5y9AR6sLT9elxYMiqr8=/0x0:1024x683/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F406%2F0c4%2F524%2F4060c4524aaed10a510058c645377428.jpg',
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: "https://assets.weforum.org/sf_account/image/Q_pgt00DjmcLa-vt8s5d3ohkZZtOyY_hPJUMekleFq0.jpg" }} style={styles.avatar}></Image>
                <View style={{}}>
                    <Text style={styles.name}>Matias Palma</Text>
                    <Text style={styles.handle}>@ariel vilxes</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={styles.start}>
                    <Text style={styles.statNum}>18 followers</Text>
                    <Text>19 followin</Text>
                </View>
                <View style={styles.start}>
                    <Text style={styles.statNum}>30 posts</Text>
                    <Text>30 reells</Text>
                </View>
                <View style={styles.start}>
                    <Text style={styles.statNum}>24</Text>
                    <Text>54</Text>
                </View>
            </View>
            {/* <View style={{ marginTop: 16 }}>
                <Button title='Editar perfil' onPress={() => navigation.navigate('EditarPerfil', { userId: '123' })}></Button>
            </View >
            <View style={{marginTop: 16 }}>
                <Button title='Ir al Dashboard' onPress={() => navigation.navigate('DashboardSelector')}></Button>
            </View>
            <View style={{ marginTop: 8 }}>
                <Button title='Panel Admin' onPress={() => navigation.navigate('AdministradorScreen')}></Button>
            </View>
            <View style={{ marginTop: 8 }}>
                <Button title='Agendar' onPress={() => navigation.navigate('Agenda')}></Button>
            </View> */}
            <View>
                <Text >Posts</Text>
                <Gallerry images={images} numColumns={3} />
            </View>
        </SafeAreaView>
    );
}
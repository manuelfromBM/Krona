import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    KeyboardAvoidingView,
    Platform,
    Alert } from "react-native";    
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./EditProfile.styles"

const EditProfileScreen: React.FC = () => { 
    const [name, setName] = useState("Ariel Vilches");
    const [userName, setUserName] = useState("ariel_vilxes")
    const [bio, setBio] = useState("Ingeniero informatico • el papá de tu papá");
    const [email, setEmail] = useState("zirariel327@gmail.com");
    const [photo, setPhoto] = useState< string | null >("https://media.revistagq.com/photos/61641b095c35f3d47d7c5454/1:1/w_1539,h_1539,c_limit/Metroid-Dread.jpeg");
    const [loading, setLoading] = useState(false);
//____________________________________________________________________________________________
    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permisos", "Necesitamos permisos para acceder a tus fotos.");
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }

    };

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert("Error","El nombre no puede estar vacio");
            return;
        }
        if (!userName.trim()) {
            Alert.alert("Error","El usuario no puede estar vacio");
            return;
        }
        setLoading(true);
        setTimeout(() =>{
            setLoading(false);
            Alert.alert("Aprobado","Perfil actualizado")
        }, 900)

    };
//__________________________________________________________________
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.container}>
                <LinearGradient 
                    colors={["#f58529","#dd2a7b","#8134af"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={styles.header}
                    >
                    <Text style={styles.headerTitle}>Editar perfil</Text>
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => Alert.alert("","")}>
                        <Feather name="log-out" size={20} color="#fff"/>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.avatarWrap}>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                        <Image source={{ uri: photo }}/>
                        <View>
                            <Feather/>
                            <Text></Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text></Text>
                    <TextInput/>
                    <Text></Text>
                    <TextInput/>
                    <Text></Text>
                    <TextInput/>
                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
                </View>
                <View/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProfileScreen;
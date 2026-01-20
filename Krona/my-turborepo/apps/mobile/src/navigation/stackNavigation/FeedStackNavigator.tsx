import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import Publicaciones from "src/components/Feed/Publicacion";
import ScreenAgenda from "src/screens/agenda/Agenda";
import ScreenNotificacinoes from "src/screens/notificaciones/notificaciones";
//import FeedDetail from "../";
import { Image } from "react-native";

//_________ ESTE BLOQUE DEBE IRSE A TYPES__________

export type FeedStackParamList = {
    FeedList: undefined;
    ScreenAgenda: undefined;
    ScreenNotificacinoes: undefined;
    FeedDetail: { id: string };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

const FeedStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FeedList"
                component={Publicaciones}
                options={({ navigation }) => ({
                    headerTitle: () => (
                        <Image
                            source={require("assets/KronaLogo.png")}
                            style={{ width: 120, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: "#ffffffff",
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ScreenNotificacinoes")}
                            style={{ marginRight: 15 }}
                        >
                            <FontAwesome name="inbox" size={24} />
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen name="ScreenNotificacinoes" component={ScreenNotificacinoes} options={{ title: "ScreenNotificacinoes" }} />
            {/* <Stack.Screen name="ScreenAgenda" component={ScreenAgenda} options={{ title: "ScreenAgenda" }} /> */}
            {/* <Stack.Screen name="FeedDetail" component={FeedDetail} options={{ title: "Details" }}/> */}
        </Stack.Navigator>
    );
};

export default FeedStackNavigator;
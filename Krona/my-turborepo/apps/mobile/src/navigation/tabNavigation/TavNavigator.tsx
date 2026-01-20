import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import ProfileScreen from "../../screens/profile/Profile";
import FeedStackNavigator from "../stackNavigation/FeedStackNavigator";
import ProfileStackNavigator from "../stackNavigation/ProfileStackNavigator";
import { Login } from "src/screens/login/Login";
import { MapScreen } from "src/screens/map/Map";
import ScreenNotificacinoes from "src/screens/notificaciones/notificaciones";

export type TabParamList = {
    FeedStack: undefined;
    ProfileStack: undefined;
    LoginStack: undefined;
    ExplorerStack: undefined;
    Notificaciones: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            id=""
            screenOptions={{
                headerShown: false, // el header lo maneja cada stack si amerita compipi
            }}
        >
            <Tab.Screen name="FeedStack" component={FeedStackNavigator} options={{ title: "Feed" }} />
            <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{ title: "Perfil" }} />
            <Tab.Screen name="ExplorerStack" component={MapScreen} options={{ title: "Explorer" }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../../screens/profile/Profile";
import FeedStackNavigator from "../stackNavigation/FeedStackNavigator";

export type TabParamList = {
    FeedTab: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // el header lo maneja cada stack si amerita compipi
            }}
        >
            <Tab.Screen name="FeedTab" component={FeedStackNavigator} options={{ title: "Feed" }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
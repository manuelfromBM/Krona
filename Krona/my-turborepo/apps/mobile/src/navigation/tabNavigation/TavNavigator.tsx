import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import ProfileScreen from "../../screens/profile/Profile";
import FeedStackNavigator from "../stackNavigation/FeedStackNavigator";
import ProfileStackNavigator from "../stackNavigation/ProfileStackNavigator";

export type TabParamList = {
    FeedStack: undefined;
    ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // el header lo maneja cada stack si amerita compipi 
            }}
        >
            <Tab.Screen name="FeedStack" component={FeedStackNavigator} options={{ title: "Feed" }}/>
            <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{ title: "Perfil" }}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
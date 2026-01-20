import TabNavigator from '../tabNavigation/TavNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "@packages/hooks";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "src/navigation/stackNavigation/AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native"
import React, { useContext } from 'react';

const RootStack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
    const { userToken, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }} id=''>
                {userToken == null ? (
                    <RootStack.Screen name="Auth" component={AuthStack}></RootStack.Screen>
                ) : (
                    <RootStack.Screen name="Krona" component={TabNavigator}></RootStack.Screen>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
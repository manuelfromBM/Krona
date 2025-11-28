import { NavigationContainer } from "@react-navigation/native"
//import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from 'react';
import TabNavigator from './src/navigation/tabNavigation/TavNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "@packages/hooks";
//import { View } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "src/navigation/stackNavigation/AuthStackNavigator";

const RootStack = createNativeStackNavigator();
// const Stack = createStackNavigator();
const RootNavigator: React.FC = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  //console.log("USER TOKEN EN ROOT: ", userToken);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        { userToken == null ? (
          <RootStack.Screen name="Auth" component={AuthStack}></RootStack.Screen>
        ) : (
          <RootStack.Screen name="App" component={TabNavigator}></RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
//________________________________________________________
const App: React.FC = () => {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
  )
};

export default App;











    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
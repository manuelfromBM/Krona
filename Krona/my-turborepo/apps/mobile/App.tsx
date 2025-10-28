import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from './src/screens/profile/Profile'
import React from 'react';
import TabNavigator from './src/navigation/tabNavigation/TavNavigator';
import Publicaciones from 'src/components/Feed/Publicacion';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigator /> 
    </NavigationContainer>
  );
}
export default App;


      // <Stack.Navigator>
      //   {/* <Stack.Screen name="Feed" component={FeedScreen} /> */}
      //   <Stack.Screen name="Profile" component={ProfileScreen} />
      //   {/*Componente de login san_martin*/}
      //   <Stack.Screen name="Feed" component={Publicaciones} />
      // </Stack.Navigator>
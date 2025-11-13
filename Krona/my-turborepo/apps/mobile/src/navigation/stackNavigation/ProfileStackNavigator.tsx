import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "src/screens/profile/Profile";
import EditProfileScreen from "src/screens/editProfile/EditProfile";

type ProfileStackParamList = {
  Profile: { userId?: string } | undefined;
  EditarPerfil: { userId?: string } | undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Stack.Screen name="EditarPerfil" component={EditProfileScreen} options={{ title: "EditarPerfil" }} />
    </Stack.Navigator>
  );
}

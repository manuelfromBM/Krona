// src/navigation/ProfileStackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "src/screens/profile/Profile";
import EditProfileScreen from "src/screens/editProfile/EditProfile";
import DashboardScreen from "src/screens/dashboard/Dashboard"; // importamos dashboard
//import Settings from "src/components/Profile/Settings";
//import type { ProfileStackParamList } from "src/navigation/types";

type ProfileStackParamList = {
  Profile: { userId?: string } | undefined;
  EditarPerfil: { userId?: string } | undefined;
  Dashboard: undefined; // aca agregamos el Dashboard
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Stack.Screen name="EditarPerfil" component={EditProfileScreen} options={{ title: "EditarPerfil" }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{title: "Dashboard"}} /> 
    </Stack.Navigator>
  );
}

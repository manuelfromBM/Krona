import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "src/screens/profile/Profile";
import EditProfileScreen from "src/screens/editProfile/EditProfile";
import  DashboardSelectorScreen  from "src/screens/dashboard/DashboardSelectorScreen";
import { DashboardFree } from "src/screens/dashboard";
import DashboardPremium from "src/screens/dashboard/premium/DashboardPremium";
//import Settings from "src/components/Profile/Settings";
//import type { ProfileStackParamList } from "src/navigation/types";

type ProfileStackParamList = {
  Profile: { userId?: string } | undefined;
  EditarPerfil: { userId?: string } | undefined;
  DashboardSelector: { userId?: string } | undefined; // aca agregamos el Dashboard
  DashboardPremium: undefined;
  DashboardFree: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Stack.Screen name="EditarPerfil" component={EditProfileScreen} options={{ title: "EditarPerfil" }} />
      <Stack.Screen name="DashboardSelector" component={DashboardSelectorScreen} options={{title: "DashboardSelector"}} /> 
      <Stack.Screen name="DashboardFree" component={DashboardFree} options={{title: "Dashboard Free"}} />
      <Stack.Screen name="DashboardPremium" component={DashboardPremium} options={{title: "Dashboard Premium"}} />
    </Stack.Navigator>
  );
}

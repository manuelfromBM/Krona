import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "src/screens/profile/Profile";
import EditProfileScreen from "src/screens/editProfile/EditProfile";
import AdministradorScreen from "src/screens/administrador/Administrador";
import ServiciosScreenCrud from "src/screens/administrador/Crud/Crud";
import ScreenAgenda from "src/screens/agenda/Agenda";
//import Settings from "src/components/Profile/Settings";
//import type { ProfileStackParamList } from "src/navigation/types";

type ProfileStackParamList = {
  Profile: { userId?: string } | undefined;
  EditarPerfil: { userId?: string } | undefined;
  AdministradorScreen: undefined;
  ServiciosCrud: undefined;
  Agenda: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Stack.Screen name="Agenda" component={ScreenAgenda} options={{ title: "Agenda" }}></Stack.Screen>
      <Stack.Screen name="EditarPerfil" component={EditProfileScreen} options={{ title: "EditarPerfil" }} />
      <Stack.Screen name="AdministradorScreen" component={AdministradorScreen} options={{ title: "Panel Admin" }} />
      <Stack.Screen name="ServiciosCrud" component={ServiciosScreenCrud} options={{ title: "Servicios (CRUD)" }} />
    </Stack.Navigator>
  );
}

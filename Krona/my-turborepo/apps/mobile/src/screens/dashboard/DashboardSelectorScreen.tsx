import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./Dasboard.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "src/navigation/stackNavigation/ProfileStackNavigator";

type Props = NativeStackScreenProps< ProfileStackParamList, "DashboardSelector" >;

export default function DashboardSelectorScreen({ navigation }: Props ) {


    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Elige tu Dashboard</Text>
          <Text style={styles.subtitle}>
            Compara las funciones y selecciona la vista que más te sirva.
          </Text>
  
          {/* CARD FREE */}
          <View style={[styles.card, styles.cardFree]}>
            <View style={styles.iconContainer}>
              <Icon name="leaf-outline" size={40} color="#2ecc71" />
            </View>
  
            <Text style={styles.cardTitle}>Dashboard Free</Text>
  
            <Text style={styles.cardText}>Incluye:</Text>
            <Text style={styles.item}>✅ Ganancias del día</Text>
            <Text style={styles.item}>✅ Citas del día</Text>
            <Text style={styles.item}>✅ Vistas del mes</Text>
  
            <Text style={styles.cardTextMuted}>No incluye:</Text>
            <Text style={styles.itemMuted}>❌ Estadísticas avanzadas</Text>
            <Text style={styles.itemMuted}>❌ Calendario inteligente</Text>
            <Text style={styles.itemMuted}>❌ Exportar datos</Text>
  
            <TouchableOpacity style={[styles.button, styles.freeButton]}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
  
          {/* CARD PREMIUM */}
          <View style={[styles.card, styles.cardPremium]}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Recomendado</Text>
            </View>
  
            <View style={styles.iconContainer}>
              <Icon name="diamond-outline" size={40} color="#fff" />
            </View>
  
            <Text style={[styles.cardTitle, styles.cardTitlePremium]}>
              Dashboard Premium
            </Text>
  
            <Text style={styles.cardTextLight}>
              Incluye TODO lo del Free y además:
            </Text>
  
            <Text style={styles.itemLight}>✅ Calendario estilo Google</Text>
            <Text style={styles.itemLight}>✅ Filtros Día / Semana / Mes</Text>
            <Text style={styles.itemLight}>✅ Exportar Excel / PDF</Text>
            <Text style={styles.itemLight}>✅ Estadísticas avanzadas</Text>
            <Text style={styles.itemLight}>✅ Clientes fieles, frecuentes y más</Text>
  
            <TouchableOpacity style={[styles.button, styles.premiumButton]}
              onPress={() => navigation.navigate('DashboardPremium')}
            >
              <Text style={styles.buttonText}>Entrar Premium</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
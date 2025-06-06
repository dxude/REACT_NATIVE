
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

const colors = {
  background: '#1A1A1A',
  text: '#EAEAEA',
  primary: '#00FF00',
  cardBackground: '#282A2D',
};

const technologies = [
  { name: 'React Native', icon: 'react', category: 'Core' },
  { name: 'Expo & Expo Router', icon: 'sitemap', category: 'Core & Navegação' },
  { name: 'JavaScript (ES6+)', icon: 'jsfiddle', category: 'Linguagem' },
  { name: 'Expo File System & Sharing', icon: 'share-alt', category: 'Funcionalidades' },
  { name: 'Expo Google Fonts', icon: 'font', category: 'UI' },
  { name: 'React Hooks', icon: 'cogs', category: 'React' },
];

export default function AboutScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainTitle}>Sobre o App</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Missão</Text>
          <Text style={styles.cardText}>
            Este aplicativo foi desenvolvido como um portfólio interativo para demonstrar
            minhas habilidades em desenvolvimento mobile com React Native e Expo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tecnologias Utilizadas</Text>
          {technologies.map((tech, index) => (
            <View key={index} style={styles.techItem}>
              <FontAwesome name={tech.icon} size={20} color={colors.primary} style={styles.techIcon} />
              <View>
                <Text style={styles.techName}>{tech.name}</Text>
                <Text style={styles.techCategory}>Categoria: {tech.category}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, padding: 20 },
  mainTitle: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 5,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  techIcon: {
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  techName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  techCategory: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
  },
});
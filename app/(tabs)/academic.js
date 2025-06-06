
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

const academicExperiences = [
  {
    degree: 'Tecnólogo Em Sistemas Para Internet ',
    institution: 'Universidade Católica de Pernambuco',
    period: '2023.2 - 2026.1',
    description: 'Foco em desenvolvimento de software, inteligência artificial e sistemas distribuídos. Projeto de conclusão de curso sobre a crescente de pessoas neurodiversas e a difilculdade do sistema educacional vigente se adequar a elas.',
    icon: 'university',
  },
  {
    degree: 'Formação Em Análise de Dados ',
    institution: 'Neurotech',
    period: '2025.1',
    description: 'Aprofundamento em análises de dados, envolvendo diversas ferrametas como POWER BI, PYTHON, GOOGLE SHEETS, SQL, DATA SCIENCE com técnicas estatísticas',
    icon: 'sitemap',
  },
];

export default function AcademicScreen() {
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
        <Text style={styles.mainTitle}>Formação Acadêmica</Text>

        {academicExperiences.map((exp, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <FontAwesome name={exp.icon} size={24} color={colors.primary} style={styles.icon} />
              <Text style={styles.degree}>{exp.degree}</Text>
            </View>
            <Text style={styles.institution}>{exp.institution}</Text>
            <Text style={styles.period}>{exp.period}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 15,
  },
  degree: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    flexShrink: 1,
  },
  institution: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  period: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    marginBottom: 10,
    opacity: 0.7,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});
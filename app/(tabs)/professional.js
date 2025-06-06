
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

const professionalExperiences = [
  {
    role: 'Representante Comercial',
    company: 'CENTRAL DOS CATALISADORES LTDA',
    period: 'Novembro/2023 - Setembro/2024',
    responsibilities: [
      'Análise de Dados e Geração de Relatórios para Gestores.',
      'Manutenção da Carteira de Clientes.',
      'Acompanhamento Pós-Venda',
    ],
    icon: 'users',
  },
  {
    role: 'Representante Comercial',
    company: 'TECHEMET DO BRASIL',
    period: 'Setembro/2022 - Outubro/2023',
    responsibilities: [
      'Prospecção de clientes no setor de autopeças.',
      'Viagens regionais e interestaduais para prospecção, compra e negociação de peças.',
      'Acompanhamento de mercado e identificação de oportunidades.',
    ],
    icon: 'users',
  },
];

export default function ProfessionalScreen() {
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
        <Text style={styles.mainTitle}>Experiência Profissional</Text>
        {professionalExperiences.map((exp, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <FontAwesome name={exp.icon} size={24} color={colors.primary} style={styles.icon} />
              <Text style={styles.role}>{exp.role}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.period}>{exp.period}</Text>
            <Text style={styles.responsibilitiesTitle}>Principais Responsabilidades:</Text>
            {exp.responsibilities.map((resp, rIndex) => (
              <Text key={rIndex} style={styles.responsibility}>• {resp}</Text>
            ))}
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
  role: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    flexShrink: 1,
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  period: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    marginBottom: 12,
    opacity: 0.7,
  },
  responsibilitiesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  responsibility: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
});
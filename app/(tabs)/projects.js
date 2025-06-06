
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
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


const projects = [
  {
    name: 'Aplicativo de Portfólio (Este App)',
    description: 'Um aplicativo React Native para demonstrar minhas habilidades, incluindo navegação com Expo Router e um jogo interativo.',
    technologies: ['React Native', 'Expo', 'Expo Router', 'JavaScript'],
    link: 'https://github.com/dxude/AppReactNative',
    icon: 'mobile',
  },
  {
    name: 'API TEAxis',
    description: 'TEAXIS é uma plataforma online dedicada ao acolhimento, apoio e desenvolvimento de pessoas neurodivergentes.',
    technologies: ['Spring Boot', 'PostgreSQL', 'Render'],
    link: 'https://github.com/dxude/Back-End-Plataforma-Teaxis',
    icon: 'lightbulb-o',
  },
  {
    name: 'Simulador de exportação de métricas de GPU',
    description: 'Este projeto simula a exportação de métricas de GPU utilizando containers Docker. As métricas são geradas em arquivos CSV e expostas através de um endpoint HTTP no padrão do Prometheus.',
    technologies: ['Python 3.9', 'Docker', 'Kubernetes', 'Pandas'],
    link: 'https://github.com/dxude/Infra_BancodoBrasil', 
    icon: 'cogs', 
  },
];

const openLink = (url) => {
  if (url) {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }
};

export default function ProjectsScreen() {
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
        <Text style={styles.mainTitle}>Meus Projetos</Text>
        {projects.map((project, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <FontAwesome name={project.icon || 'briefcase'} size={22} color={colors.primary} style={styles.icon} />
              <Text style={styles.projectName}>{project.name}</Text>
            </View>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={styles.techTitle}>Tecnologias:</Text>
            <View style={styles.techContainer}>
              {project.technologies.map((tech, tIndex) => (
                <Text key={tIndex} style={styles.techItem}>{tech}</Text>
              ))}
            </View>
            {project.link && (
              <TouchableOpacity onPress={() => openLink(project.link)} style={styles.linkButton}>
                <FontAwesome name="github" size={18} color={colors.primary} />
                <Text style={styles.linkButtonText}>Ver no GitHub</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
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
    marginBottom: 10,
  },
  icon: {
    marginRight: 12,
  },
  projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    flexShrink: 1,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 15,
  },
  techTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    opacity: 0.8,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  techItem: {
    backgroundColor: colors.primary,
    color: colors.buttonText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  linkButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
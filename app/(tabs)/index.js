
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';


import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';


const colors = {
  background: '#1A1A1A',     
  text: '#EAEAEA',          
  primary: '#00FF00',      
  accent: '#00FF00',        
  cardBackground: '#282A2D', 
  buttonText: '#1A1A1A',     
};
export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const handleDownloadCV = async () => {
    try {
      const asset = Asset.fromModule(require('../assets/curriculo.pdf'));
      await asset.downloadAsync(); 

      if (!asset.localUri) {
        Alert.alert("Erro", "Não foi possível encontrar o arquivo do currículo.");
        return;
      }

      const destinationUri = FileSystem.documentDirectory + "Curriculo_Eduarda_Veloso.pdf";
      await FileSystem.copyAsync({ from: asset.localUri, to: destinationUri });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destinationUri, { mimeType: 'application/pdf' });
      } else {
        Alert.alert("Indisponível", "Compartilhamento não disponível.");
      }
    } catch (error) {
      console.error("Erro ao baixar CV:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar baixar o currículo.");
    }
  };

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
        <View style={styles.header}>
          <Image
            source={require('../assets/fotodeperfil.png')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Eduarda Veloso Ferreira</Text>
          <Text style={styles.title}>React Native | Spring Boot | React.Js | Power BI</Text>
        
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadCV}>
            <FontAwesome name="download" size={20} color={colors.buttonText} />
            <Text style={styles.downloadButtonText}>Baixar Currículo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo(a) ao meu Portfólio!</Text>
          <Text style={styles.cardText}>
            Ei, olá! 👋
            Me chamo Eduarda Veloso, sou uma dev fullstack júnior que acredita que código bom é aquele que resolve problemas — especialmente os do dia a dia (e de preferência com um toque criativo!). Adoro usar a tecnologia como ferramenta para facilitar a vida das pessoas, e se o desafio envolver impacto social, meu interesse dobra!
            Quando não estou mergulhada em linhas de código, provavelmente estou viajando (ou planejando a próxima viagem), conhecendo gente nova ou me perdendo em algum artigo sobre neurociência — porque sim, acho fascinante como o cérebro humano e a tecnologia podem se conectar. Se você busca alguém curiosa, apaixonada por soluções e que adora trocar ideias (sobre tech, viagens ou qualquer coisa fora da caixa), bora bater um papo! 🚀
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Navegação Rápida</Text>
          <Link href="/about" style={styles.link}>
            <Text style={styles.linkText}>Sobre Mim</Text>
          </Link>
          <Link href="/projects" style={styles.link}>
            <Text style={styles.linkText}>Meus Projetos</Text>
          </Link>
          <Link href="/game" style={styles.link}>
            <Text style={styles.linkText}>Jogar Senha</Text>
          </Link>
        </View>
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
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary, 
  },
  name: {
    fontFamily: 'PressStart2P_400Regular', 
    fontSize: 18, 
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 5,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  link: {
    marginVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: 'bold',
  },
});
// app/tabs/game.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

const gameColors = {
  background: '#1D1F21',
  primaryText: '#00FF00',
  secondaryText: '#FFA500',
  accent: '#FF00FF',
  inputBackground: '#333333',
  inputBorder: '#00FFFF',
  inputText: '#FFFFFF',
  bulls: '#00FF00',
  cows: '#FFFF00',
  error: '#FF4136',
  success: '#39CCCC',
  disabledButton: '#555555',
  attemptText: '#F0F0F0',
  attemptBackground: '#282A2D',
};

const MAX_ATTEMPTS = 10;
const CODE_LENGTH = 4;

const generateSecretCode = () => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let secret = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    secret += digits.splice(randomIndex, 1)[0];
  }
  return secret;
};

export default function GameScreen() {
  const [fontsLoaded] = useFonts({ PressStart2P_400Regular });
  const [secretCode, setSecretCode] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('');

  const initializeGame = useCallback(() => {
    const newSecretCode = generateSecretCode();
    setSecretCode(newSecretCode);
    setGuess('');
    setAttempts([]);
    setRemainingAttempts(MAX_ATTEMPTS);
    setGameOver(false);
    setGameWon(false);
    setMessage(`Adivinhe o codigo! ${MAX_ATTEMPTS} chances.`);
  }, []);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  const handleGuessChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    if (filteredText.length <= CODE_LENGTH) { setGuess(filteredText); }
  };

  const handleSubmitGuess = () => {
    if (guess.length !== CODE_LENGTH || new Set(guess.split('')).size !== CODE_LENGTH) {
      Alert.alert('Erro!', `A tentativa deve ter ${CODE_LENGTH} digitos unicos.`);
      return;
    }

    let bulls = 0; let cows = 0;
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (guess[i] === secretCode[i]) { bulls++; } 
      else if (secretCode.includes(guess[i])) { cows++; }
    }

    setAttempts(prev => [{ guess, bulls, cows }, ...prev]);
    const newRemaining = remainingAttempts - 1;
    setRemainingAttempts(newRemaining);
    setGuess('');

    if (bulls === CODE_LENGTH) {
      setGameOver(true); setGameWon(true);
      setMessage(`Voce venceu! Codigo: ${secretCode}`);
    } else if (newRemaining === 0) {
      setGameOver(true); setGameWon(false);
      setMessage(`Game Over! Codigo: ${secretCode}`);
    } else {
      setMessage(`Chances: ${newRemaining}`);
    }
  };

  const handleRevealCode = () => { Alert.alert('Segredo!', `O codigo e: ${secretCode}`); };
  const handlePlayAgain = () => { initializeGame(); };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={gameColors.primaryText} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>JOGO SENHA</Text>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}><Text style={{color: gameColors.bulls}}>Bulls (B)</Text>: Certo no lugar certo.</Text>
          <Text style={styles.instructions}><Text style={{color: gameColors.cows}}>Cows (C)</Text>: Certo no lugar errado.</Text>
        </View>
        <View style={styles.gameStatus}>
          <Text style={[styles.statusText, gameWon ? styles.winText : gameOver && !gameWon ? styles.loseText : null]}>
            {message}
          </Text>
        </View>
        {!gameOver && (
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={guess} onChangeText={handleGuessChange} keyboardType="number-pad" maxLength={CODE_LENGTH} placeholder="----" placeholderTextColor={gameColors.inputBorder}/>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmitGuess} disabled={guess.length !== CODE_LENGTH}><Text style={styles.buttonText}>OK</Text></TouchableOpacity>
          </View>
        )}
        {gameOver && (
          <TouchableOpacity style={[styles.button, styles.playAgainButton]} onPress={handlePlayAgain}><FontAwesome name="repeat" size={16} color={gameColors.background} /><Text style={styles.buttonText}> Jogar Novamente</Text></TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.revealButton]} onPress={handleRevealCode}><FontAwesome name="eye" size={16} color={gameColors.primaryText} /><Text style={styles.revealButtonText}> Ver Codigo</Text></TouchableOpacity>
        {attempts.length > 0 && (
          <View style={styles.attemptsContainer}>
            <Text style={styles.attemptsTitle}>Tentativas:</Text>
            {attempts.map((att, index) => (
              <View key={index} style={styles.attemptItem}>
                <Text style={styles.attemptNumber}>{attempts.length - index}.</Text>
                <Text style={styles.attemptGuess}>{att.guess}</Text>
                <Text style={styles.attemptFeedback}> B: <Text style={{color: gameColors.bulls}}>{att.bulls}</Text>, C: <Text style={{color: gameColors.cows}}>{att.cows}</Text></Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: gameColors.background },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
  container: { flexGrow: 1, padding: 15, alignItems: 'center' },
  title: { fontFamily: 'PressStart2P_400Regular', fontSize: 20, color: gameColors.primaryText, marginBottom: 20, textAlign: 'center' },
  instructionsContainer: { marginBottom: 15, padding: 10, backgroundColor: gameColors.inputBackground, borderRadius: 5, borderWidth: 2, borderColor: gameColors.inputBorder },
  instructions: { fontFamily: 'PressStart2P_400Regular', fontSize: 8, color: gameColors.secondaryText, textAlign: 'center', marginBottom: 5, lineHeight: 16 },
  gameStatus: { marginVertical: 10, paddingVertical: 8, paddingHorizontal:15, backgroundColor: gameColors.inputBackground, borderRadius: 5, borderWidth: 2, borderColor: gameColors.primaryText, width: '100%', alignItems: 'center' },
  statusText: { fontFamily: 'PressStart2P_400Regular', fontSize: 10, color: gameColors.primaryText, textAlign: 'center' },
  winText: { color: gameColors.bulls },
  loseText: { color: gameColors.error },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, width: '100%', justifyContent: 'space-between' },
  input: { fontFamily: 'PressStart2P_400Regular', backgroundColor: gameColors.inputBackground, borderColor: gameColors.inputBorder, borderWidth: 2, color: gameColors.inputText, paddingHorizontal: 10, paddingVertical: Platform.OS === 'ios' ? 12 : 8, fontSize: 18, borderRadius: 5, width: '65%', textAlign: 'center', letterSpacing: Platform.OS === 'ios' ? 8 : 4 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5, borderWidth: 2, minHeight: 40, marginVertical: 8 },
  submitButton: { backgroundColor: gameColors.accent, borderColor: gameColors.accent, minWidth: '30%' },
  revealButton: { backgroundColor: 'transparent', borderColor: gameColors.inputBorder, width: '90%', maxWidth: 300 },
  playAgainButton: { backgroundColor: gameColors.success, borderColor: gameColors.success, width: '90%', maxWidth: 300 },
  buttonText: { fontFamily: 'PressStart2P_400Regular', color: gameColors.background, fontSize: 10, textAlign: 'center', marginLeft: 6 },
  revealButtonText: { fontFamily: 'PressStart2P_400Regular', color: gameColors.primaryText, fontSize: 10, textAlign: 'center', marginLeft: 6 },
  attemptsContainer: { marginTop: 15, width: '100%', backgroundColor: gameColors.attemptBackground, borderRadius: 5, borderWidth: 2, borderColor: gameColors.inputBorder, padding: 10 },
  attemptsTitle: { fontFamily: 'PressStart2P_400Regular', fontSize: 12, color: gameColors.primaryText, marginBottom: 10, textAlign: 'center' },
  attemptItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: gameColors.inputBackground },
  attemptNumber: { fontFamily: 'PressStart2P_400Regular', fontSize: 10, color: gameColors.secondaryText, marginRight: 5 },
  attemptGuess: { fontFamily: 'PressStart2P_400Regular', fontSize: 10, color: gameColors.attemptText, letterSpacing: 2 },
  attemptFeedback: { fontFamily: 'PressStart2P_400Regular', fontSize: 10, color: gameColors.attemptText },
});
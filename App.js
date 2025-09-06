import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './src/components/Button';

export default function App() {
  return (
    <View>
      <StatusBar style="light" />

      <View>
        <Text>Conversor de Moedas</Text>
        <Text>
          Converta Valores entre diferentes Moedas
        </Text>
      </View>

      <View>
        <Text>De:</Text>
        <Button variant='secondary'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

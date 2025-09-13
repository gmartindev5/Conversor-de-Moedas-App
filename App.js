import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies'
import { Input } from './src/components/input';
import { ResultCard } from './src/components/ResultCard/styles';
import { exchangerateApi } from './src/services/api'
import { useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setfromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [result, setResult] = useState('')
  const [loadign, setLoading] = useState(false)
  const [exchangeRate, setexchangeRate] = useState(null)

  async function fetchExchangeRate() {
    const data = await exchangerateApi(`BRL`)
    console.log(data)
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>

        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>
              Converta Valores entre diferentes Moedas
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button variant='primary'
                  key={currency.code}
                  currency={currency}
                  onPress={() => setfromCurrency(currency.code)}
                >

                </Button>
              ))}
            </View>
            <Input label="Valor: " />

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>
                ↑ ↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para: </Text>
            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button variant='secondary'
                  key={currency.code}
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={true}
                >

                </Button>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.convertButton}
            onPress={fetchExchangeRate}
          >
            <Text style={styles.swapButtonText}>
              Converter
            </Text>
          </TouchableOpacity>

          <ResultCard />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies'
import { Input } from './src/components/input';
import { ResultCard } from './src/components/ResultCard/index';
import { exchangerateApi } from './src/services/api'
import { convertCurrency } from './src/utils/convertCurrency';
import { useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setfromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [result, setResult] = useState('')
  const [loadign, setLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(null)

  async function fetchExchangeRate() {
    const data = await exchangerateApi(fromCurrency)
    const rate = data.rates[toCurrency]
    setExchangeRate(rate)
    const convertedAmount = convertCurrency(amount, rate)
    setResult(convertedAmount)
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
                  isSelected={fromCurrency === currency.code}
                >

                </Button>
              ))}
            </View>
            <Input label="Valor: " value={amount} onChangeText={setAmount} />

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
                  isSelected={toCurrency === currency.code}
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

          <ResultCard 
           exchangeRate={exchangeRate}
           result={result}
           fromCurrency={fromCurrency}
           toCurrency={toCurrency}
           currencies={currencies}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

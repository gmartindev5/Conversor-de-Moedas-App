import { Text, View } from "react-native";



export function ResultCard({
    exchangeRate,
    result,
    fromCurrency,
    toCurrency,
    currencies,
}) {

    if (!result || !exchangeRate) return null

    return (
        <View>
            <Text>Resultado:</Text>
            <Text>
                {result}
            </Text>
            <Text>
                Taxa de câmbio 1: {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </Text>
        </View>
    )
}
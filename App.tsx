import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [holydays, setHolydays] = useState([])
  const [loading, setLoading] = useState(true)
  const currentYear = new Date().getFullYear()
  const url = `https://brasilapi.com.br/api/feriados/v1/${currentYear}`

  const request = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setHolydays(data)
    setLoading(false)
  }

  useEffect(() => {
    request()
  }, [])

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )

  return (
    <View style={styles.container}>
      <Text>Feriados Nacionais</Text>
      {holydays.map((holyday) => (
        <View key={holyday.date}>
          <Text>{holyday.name}</Text>
          <Text>
            {new Date(holyday.date).toLocaleDateString('pt-BR', {
              dateStyle: 'full',
            })}
          </Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

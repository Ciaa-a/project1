import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from '../../lib/supabase'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      return Alert.alert('Error', 'All fields are required.')
    }
    if (!email.endsWith('@gmail.com')) {
      return Alert.alert('Error', 'Email must be a @gmail.com address.')
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match.')
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      Alert.alert('Sign Up Error', error.message)
      setLoading(false)
      return
    }

    const user = data?.user ?? data?.session?.user
    if (!user) {
      Alert.alert('Error', 'User data is missing after sign up.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('profiles').insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      username,
      role: 'customer',
    })

    if (insertError) {
      Alert.alert('Database Error', insertError.message)
      setLoading(false)
      return
    }

    Alert.alert('Success', 'Registration successful! Please check your email to verify your account.')
    setLoading(false)
    // Optional: clear form fields here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Customer</Text>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />
      <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#0e1e4d', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
})

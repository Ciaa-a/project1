import { useRouter } from 'expo-router'; // Menggunakan expo-router untuk navigasi
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleRegister = async () => {
  if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
    return Alert.alert('Error', 'All fields are required.');
  }

  if (password !== confirmPassword) {
    return Alert.alert('Error', 'Passwords do not match.');
  }

  setLoading(true);

  // Kirim data registrasi ke backend Golang yang di-host di Railway
  try {
    const response = await fetch('https://projectminyakproduction.up.railway.app/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return Alert.alert('Sign Up Error', data.error || 'Unknown error');
    }

    Alert.alert('Success', 'Registration successful! Redirecting to login...');
    setLoading(false);
    router.push('/auth/login');
  } catch (error) {
    console.error(error);
    Alert.alert('Sign Up Error', 'An error occurred during registration.');
    setLoading(false);
  }
};


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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  button: { backgroundColor: '#0e1e4d', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

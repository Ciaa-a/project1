import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'All fields are required.');

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return Alert.alert('Login Failed', error.message);

    const { data: userData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    switch (userData?.role) {
      case 'admin':
        router.replace('/dashboard/admin');
        break;
      case 'manager':
        router.replace('/dashboard/manager');
        break;
      case 'sales':
        router.replace('/dashboard/sales');
        break;
      default:
        Alert.alert('Access Denied', 'Only admin, manager, and sales can login.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.panelLeft}>
        <Text style={styles.welcome}>Artha Makmur Jaya</Text>
        <Text style={styles.desc}>Experience the next generation of digital authentication</Text>
      </View>

      <View style={styles.panelRight}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerLink}>
  Don't have an account?{' '}
  <Text style={styles.registerText} onPress={() => router.push('/auth/register')}>
    Register
  </Text>
</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  panelLeft: {
    flex: 1,
    backgroundColor: '#0e1e4d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    color: '#d0d0d0',
    textAlign: 'center',
  },
  panelRight: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0e1e4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 16,
    textAlign: 'center',
  },
  registerText: {
  color: '#0e1e4d',
  fontWeight: 'bold',
},
});

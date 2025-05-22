// import { Link, useRouter } from 'expo-router';
// import { useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       return Alert.alert('Error', 'All fields are required.');
//     }

//     // permintaan login ke backend Golang yang di-host di Railway
//     try {
//       const response = await fetch('https://projectminyakproduction.up.railway.app/signin', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpYm15cmJnZWZsam1zeWRhdm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDM4NzcsImV4cCI6MjA2MDQ3OTg3N30.jlGY479K0dlwNmZfq9_BIpZlytXikNKqBN0atKtVUEU',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         return Alert.alert('Login Failed', data.error || 'Unknown error');
//       }

//       const userData = data.user;
//       if (userData && userData.role) {
//         switch (userData.role) {
//           case 'admin':
//             router.replace('/dashboard/admin');
//             break;
//           case 'manager':
//             router.replace('/dashboard/manager');
//             break;
//           case 'sales':
//             router.replace('/dashboard/sales');
//             break;
//           case 'customer':
//             router.replace('/dashboard/customer');
//             break;
//           default:
//             Alert.alert('Access Denied', 'Only admin, manager, and sales can login.');
//         }
//       } else {
//         Alert.alert('Login Failed', 'No role found for the user.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Login Failed', 'An error occurred while logging in.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.panelLeft}>
//         <Text style={styles.welcome}>Artha Makmur Jaya</Text>
//         <Text style={styles.desc}>Experience the next generation of digital authentication</Text>
//       </View>

//       <View style={styles.panelRight}>
//         <Text style={styles.title}>Sign In</Text>
//         <TextInput
//           placeholder="Enter your email"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="Enter your password"
//           style={styles.input}
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//         <Text style={styles.registerLink}>
//           Don't have an account? <Link href="/auth/register">Register</Link>
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//   },
//   panelLeft: {
//     flex: 1,
//     backgroundColor: '#0e1e4d',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   welcome: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   desc: {
//     color: '#d0d0d0',
//     textAlign: 'center',
//   },
//   panelRight: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#0e1e4d',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   registerLink: {
//     marginTop: 16,
//     textAlign: 'center',
//   },
// });

import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Dummy data akun
  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'manager@example.com', password: 'manager123', role: 'manager' },
    { email: 'sales@example.com', password: 'sales123', role: 'sales' },
    { email: 'customer@example.com', password: 'customer123', role: 'customer' },
  ];

  const handleLogin = () => {
    if (!email || !password) return Alert.alert('Error', 'All fields are required.');

    // Mencari pengguna yang sesuai dari data dummy
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return Alert.alert('Login Failed', 'Invalid credentials');
    }

    // Pengguna berhasil login, arahkan berdasarkan role
    switch (user.role) {
      case 'admin':
        router.replace('/dashboard/admin');
        break;
      case 'manager':
        router.replace('/dashboard/manager');
        break;
      case 'sales':
        router.replace('/dashboard/sales');
        break;
      case 'customer':
        router.replace('/dashboard/customer');
        break;
      default:
        Alert.alert('Access Denied', 'Role not found');
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
          Don't have an account? <Link href="/auth/register">Register</Link>
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
});

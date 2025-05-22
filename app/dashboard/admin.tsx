// import { useRouter } from 'expo-router';
// import { Button, StyleSheet, Text, View } from 'react-native';

// export default function AdminDashboard() {
//   const router = useRouter();

//   const handleLogout = () => {
//     // Kembalikan ke halaman login
//     router.push('/auth/login');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome, Admin Dashboard!</Text>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });


import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Account {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: string;
}

// buat dummy doang
const initialAccounts: Account[] = [
  { id: '1', name: 'Leo', role: 'Manager', email: 'leo@company.com', password: '123456', status: 'Active' },
  { id: '2', name: 'Dian', role: 'Sales Representative', email: 'dian@company.com', password: '654321', status: 'Active' },
  { id: '3', name: 'Sasha', role: 'Sales Representative', email: 'sasha@company.com', password: 'password', status: 'Pending' },
];

export default function Dashboard() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts); //buat nyimpen akun
  const [showModal, setShowModal] = useState(false); 
  const [newName, setNewName] = useState(''); 
  const [newRole, setNewRole] = useState('Manager'); 
  const [newEmail, setNewEmail] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null); 

  const createAccount = () => {
    const emailExists = accounts.some(account => account.email === newEmail);
    if (emailExists) {
      alert("Email already exists. Please use a different email.");
      return;
    }

    const newAccount: Account = {
      id: (accounts.length + 1).toString(),
      name: newName,
      role: newRole,
      email: newEmail,
      password: newPassword,
      status: 'Active',
    };
    setAccounts([...accounts, newAccount]);
    setShowModal(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('Manager');
  };

  const deleteAccount = (id: string) => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: () => {
            setAccounts(accounts.filter(account => account.id !== id));
          }
        },
      ],
      { cancelable: true }
    );
  };

  // buat ngedit akun+delete, tp blm bisa anjeng
  const editAccount = (account: Account) => {
    setSelectedAccount(account);
    setNewName(account.name);
    setNewEmail(account.email);
    setNewRole(account.role);
    setNewPassword(account.password);
    setShowModal(true); 
  };

  //ni logout jg blm bisa asu
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout', onPress: () => {
            alert('You have been logged out.');
            setTimeout(() => {
              router.push('/auth/login');
            }, 500);
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButton} onPress={() => setShowModal(true)}>
              <Feather name="plus" size={16} color="white" />
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Feather name="log-out" size={16} color="white" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Registered Accounts</Text>
            <View style={styles.tableIcons}>
              <Feather name="filter" size={20} style={styles.icon} />
              <Feather name="search" size={20} />
            </View>
          </View>

          {accounts.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableText}>{item.name}</Text>
              <Text style={styles.tableText}>{item.role}</Text>
              <Text style={styles.tableText}>{item.email}</Text>
              <Text style={[styles.tableText, styles.activeStatus]}>{item.status}</Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Account Options',
                    'Choose an option',
                    [
                      { text: 'Edit', onPress: () => editAccount(item) },
                      { text: 'Delete', onPress: () => deleteAccount(item.id) },
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  );
                }}
              >
                <Feather name="more-vertical" size={20} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal untuk Create/Edit Account */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedAccount ? 'Edit Account' : 'Create Account'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
            />
            <Picker
              selectedValue={newRole}
              onValueChange={(itemValue) => setNewRole(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Manager" value="Manager" />
              <Picker.Item label="Sales Representative" value="Sales Representative" />
              <Picker.Item label="Customer" value="Customer" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={selectedAccount ? () => {
                setAccounts(accounts.map(account =>
                  account.id === selectedAccount.id
                    ? { ...account, name: newName, role: newRole, email: newEmail, password: newPassword }
                    : account
                ));
                setShowModal(false);
                setSelectedAccount(null);
              } : createAccount}
            >
              <Text style={styles.modalButtonText}>{selectedAccount ? 'Update' : 'Create'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              setShowModal(false);
              setSelectedAccount(null);
            }}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: { color: 'white', marginLeft: 6 },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: { color: 'white', marginLeft: 6 },
  table: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tableTitle: { fontWeight: '600', fontSize: 14 },
  tableIcons: { flexDirection: 'row' },
  icon: { marginRight: 10 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableText: { flex: 1, fontSize: 13 },
  activeStatus: { color: 'green', fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: { color: 'white' },
});

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


import { Feather, Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Dummy data akun
const accounts = [
  { id: '1', name: 'Leo', role: 'Manager', status: 'Active' },
  { id: '2', name: 'Dian', role: 'Sales Representative', status: 'Active' },
  { id: '3', name: 'Sasha', role: 'Sales Representative', status: 'Pending' },
];

// Sementara kita asumsikan user adalah admin
const currentUserRole = 'admin';

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path aktif

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <TouchableOpacity style={styles.createButton}>
            <Feather name="plus" size={16} color="white" />
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>
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
              <Text style={[styles.tableText, styles.activeStatus]}>{item.status}</Text>
              <Feather name="more-vertical" size={20} />
            </View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

type SidebarItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

function SidebarItem({ icon, label, active = false, onPress }: SidebarItemProps) {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.activeItem]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} />
      <Text style={styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  createButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  createButtonText: { color: 'white', marginLeft: 6 },
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  activeItem: {
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    padding: 4,
  },
});

import { Ionicons } from '@expo/vector-icons';
import { Slot, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Buat dummmy doang, nanti ganti sama supabase e
const currentRole = 'admin'; // bisa: 'admin', 'manager', 'sales'

const adminRoutes = [
  { label: 'Dashboard', icon: 'grid-outline', path: '/dashboard/admin' },
  { label: 'Sales', icon: 'bar-chart-outline', path: '/dashboard/sales' },
  { label: 'Manager', icon: 'briefcase-outline', path: '/dashboard/manager' },
];

export default function DashboardLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const showNav = currentRole === 'admin';

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {showNav && (
        <View style={styles.bottomNav}>
          {adminRoutes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <TouchableOpacity
                key={route.path}
                style={[styles.navItem, isActive && styles.activeItem]}
                onPress={() => router.push(route.path as "/dashboard/admin" | "/dashboard/sales" | "/dashboard/manager")}
              >
                <Ionicons name={route.icon as any} size={20} />
                <Text style={styles.navText}>{route.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
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

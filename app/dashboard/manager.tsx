import { StyleSheet, Text, View } from 'react-native';

export default function ManagerDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Manager!</Text>
            <Text style={styles.text}>view analytics</Text>
                  <Text style={styles.text}>view transaction detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 24, fontWeight: 'bold' },
});


// import React, { useEffect, useState } from 'react';
// import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { supabase } from '../../lib/supabase';

// type Analytic = {
//   analytic_id: number;
//   product_id: number;
//   analytic_result: string;
//   contribution: number | null;
//   is_top_20: boolean | null;
//   analytic_time: string;
// };

// type Transaction = {
//   transaction_id: number;
//   user_fullname: string;
//   status_transaction: string;
// };

// export default function ManagerDashboard() {
//   const [analytics, setAnalytics] = useState<Analytic[]>([]);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       const { data, error } = await supabase
//         .from('analytic')
//         .select('analytic_id, product_id, analytic_result, contribution, is_top_20, analytic_time');
      
//       if (error) {
//         console.error('Error fetching analytics:', error.message);
//         return;
//       }

//       setAnalytics(data);
//     };

//     const fetchTransactions = async () => {
//       const { data, error } = await supabase
//         .from('transaction')
//         .select('transaction_id, user_fullname, status_transaction');
      
//       if (error) {
//         console.error('Error fetching transactions:', error.message);
//         return;
//       }

//       setTransactions(data);
//     };

//     fetchAnalytics();
//     fetchTransactions();
//   }, []);

//   const handleViewAnalytic = async (analyticId: number) => {
//     const { data, error } = await supabase
//       .from('analytic')
//       .select('*')
//       .eq('analytic_id', analyticId)
//       .single();

//     if (error) {
//       Alert.alert('Error', error.message);
//       return;
//     }

//     Alert.alert('Analytic Detail', JSON.stringify(data, null, 2)); // buat nampilin data analitik
//   };

//   const handleViewTransaction = async (transactionId: number) => {
//     const { data, error } = await supabase
//       .from('transaction_detail')
//       .select('transaction_detail_id, quantity, price, date_time, product_id')
//       .eq('transaction_id', transactionId);
    
//     if (error) {
//       Alert.alert('Error', error.message);
//       return;
//     }

//     Alert.alert('Transaction Detail', JSON.stringify(data, null, 2)); // buat nampilin data transaksi detail
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome, Manager!</Text>

//       {/* Bagian Analytic */}
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Analytics</Text>
//         <FlatList
//           data={analytics}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.card} onPress={() => handleViewAnalytic(item.analytic_id)}>
//               <Text>Product ID: {item.product_id}</Text>
//               <Text>Result: {item.analytic_result}</Text>
//               <Text>Contribution: {item.contribution}</Text>
//               <Text>Top 20: {item.is_top_20 ? 'Yes' : 'No'}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.analytic_id.toString()}
//         />
//       </View>

//       {/* Bagian Transaction */}
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Transactions</Text>
//         <FlatList
//           data={transactions}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.card} onPress={() => handleViewTransaction(item.transaction_id)}>
//               <Text>Transaction ID: {item.transaction_id}</Text>
//               <Text>User: {item.user_fullname}</Text>
//               <Text>Status: {item.status_transaction}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.transaction_id.toString()}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   subTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   section: {
//     width: '100%',
//     marginTop: 20,
//   },
//   card: {
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     elevation: 2,
//   },
// });

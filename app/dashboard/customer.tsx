import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

type Product = {
  product_id: number;
  product_name: string;
  price: number;
  note: string | null;
};

interface Transaction {
  transaction_id: string;
  user_id: string;
  product_id: number;
  status_transaction: string;
};

export default function CustomerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('product')
        .select('product_id, product_name, price, note');
      
      if (error) {
        console.error('Error fetching products:', error.message);
        return;
      }

      if (data) {
        setProducts(data); // Simpan produk yang relevan
      } else {
        Alert.alert('No products found.');
      }
    };

    fetchProducts();
  }, []);

  const handleBuyProduct = async (productId: number) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      Alert.alert('Error', 'User is not logged in.');
      return;
    }

    const userId = user.id;

    const { data: transactionData, error: transactionError } = await supabase
  .from('transaction')
  .insert([{ user_id: userId, product_id: productId, status_transaction: 'Pending' }]);

if (transactionError) {
  Alert.alert('Error creating transaction', transactionError.message);
  return;
}

// Explicitly cast the data to Transaction[] type
if (!transactionData || (transactionData as Transaction[]).length === 0) {
  Alert.alert('Error', 'Transaction creation failed.');
  return;
}

const transactionId = (transactionData as Transaction[])[0]?.transaction_id;
if (!transactionId) {
  Alert.alert('Error', 'Transaction creation failed.');
  return;
}

    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoice')
      .insert([{ transaction_id: transactionId, total_price: 100, payment_method: 'Credit Card' }]);

    if (invoiceError) {
      Alert.alert('Invoice Error', invoiceError.message);
      return;
    }

    Alert.alert('Success', `Transaction and Invoice created for Product ID: ${productId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Customer!</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleBuyProduct(item.product_id)}>
            <Text>{item.product_name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>{item.note ? item.note : 'No note available'}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.product_id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', padding: 16 },
  text: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  card: { padding: 12, marginBottom: 12, backgroundColor: '#f9f9f9', borderRadius: 8, elevation: 2 },
});

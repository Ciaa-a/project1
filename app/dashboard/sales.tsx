import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase'; // Pastikan Supabase sudah terkonfigurasi

// Definisikan tipe data untuk Product, Stock, dan Raw Material
type Product = {
  product_id: number;
  product_name: string;
  price: number;
  note: string | null;
};

type Stock = {
  stock_id: number;
  product_id: number;
  stock: number;
};

type RawMaterial = {
  raw_material_id: number;
  raw_material_name: string;
  price: number;
  supplier: string;
};

export default function SalesDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

  useEffect(() => {
    // Ambil data produk
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('product')
        .select('product_id, product_name, price, note');
      
      if (error) {
        console.error('Error fetching products:', error.message);
        return;
      }

      setProducts(data);
    };

    // Ambil data stok produk
    const fetchStocks = async () => {
      const { data, error } = await supabase
        .from('stock')
        .select('stock_id, product_id, stock');
      
      if (error) {
        console.error('Error fetching stocks:', error.message);
        return;
      }

      setStocks(data);
    };

    // Ambil data raw material
    const fetchRawMaterials = async () => {
      const { data, error } = await supabase
        .from('raw_material')
        .select('raw_material_id, raw_material_name, price, supplier');
      
      if (error) {
        console.error('Error fetching raw materials:', error.message);
        return;
      }

      setRawMaterials(data);
    };

    fetchProducts();
    fetchStocks();
    fetchRawMaterials();
  }, []);

  // Fungsi untuk melihat detail produk
  const handleViewProduct = async (productId: number) => {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('product_id', productId)
      .single();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Product Detail', JSON.stringify(data, null, 2)); // Menampilkan detail produk
  };

  // Fungsi untuk melihat detail bahan baku
  const handleViewRawMaterial = async (rawMaterialId: number) => {
    const { data, error } = await supabase
      .from('raw_material')
      .select('*')
      .eq('raw_material_id', rawMaterialId)
      .single();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Raw Material Detail', JSON.stringify(data, null, 2)); // Menampilkan detail bahan baku
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Sales!</Text>

      {/* Bagian Set Product */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Set Product</Text>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleViewProduct(item.product_id)}>
              <Text>Product Name: {item.product_name}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Note: {item.note ? item.note : 'No note available'}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.product_id.toString()}
        />
      </View>

      {/* Bagian Raw Material */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Raw Material</Text>
        <FlatList
          data={rawMaterials}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleViewRawMaterial(item.raw_material_id)}>
              <Text>Raw Material Name: {item.raw_material_name}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Supplier: {item.supplier}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.raw_material_id.toString()}
        />
      </View>

      {/* Bagian Stok */}
      <View style={styles.section}>
        <Text style={styles.subTitle}>Stock</Text>
        <FlatList
          data={products} // Menggabungkan stok dengan produk untuk menampilkan stok per produk
          renderItem={({ item }) => {
            const productStock = stocks.find((stock) => stock.product_id === item.product_id);
            return (
              <View style={styles.card}>
                <Text>Product Name: {item.product_name}</Text>
                <Text>Stock: {productStock ? productStock.stock : 'Loading stock...'}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.product_id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  section: {
    width: '100%',
    marginTop: 20,
  },
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
});

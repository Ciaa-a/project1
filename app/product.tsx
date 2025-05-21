import { StyleSheet, Text, View } from 'react-native';

export default function ProductPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 24, fontWeight: 'bold' },
});

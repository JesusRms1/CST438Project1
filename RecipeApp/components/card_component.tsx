import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CardProps = { index: number }; 

const CardComponent: React.FC<CardProps> = ({ index }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Ya boi # {index}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>info....</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 15, margin: 10 },
  cardHeader: { fontSize: 18, fontWeight: 'bold' },
  cardBody: { marginTop: 5 },
  cardTitle: { fontSize: 16, color: '#666' }
});

export default CardComponent;

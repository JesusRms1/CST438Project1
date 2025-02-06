import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Recipe = {
  Nationality: string;
  Name: string;
  Protein: string;
};

type CardProps = {
  recipe: Recipe;
  index: number;
};

const RecipeComponent: React.FC<CardProps> = ({ recipe, index }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Recipe #{index + 1}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>Name: {recipe.Name}</Text>
        <Text style={styles.cardTitle}>Nationality: {recipe.Nationality}</Text>
        <Text style={styles.cardTitle}>Protein: {recipe.Protein}</Text>
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

export default RecipeComponent;

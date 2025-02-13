import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';

type Recipe = {
  Nationality: string;
  Name: string;
  Protein: string;
  strMealThumb: string;
  strMeal:string;
  idMeal:string;
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
        <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Name: {recipe.strMeal}</Text>
          <Text style={styles.cardTitle}>ID: {recipe.idMeal}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
export default RecipeComponent;

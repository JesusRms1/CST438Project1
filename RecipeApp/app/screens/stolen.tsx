import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, View, StyleSheet, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import api from './apiServices';
import { ScrollView } from 'react-native-gesture-handler';
import { removeRecipe } from './recipeappDB';
import { Button } from 'react-native-elements';

type RootStackParamList = {
  stolen: { recipeId: string; usId: number };
};

type StolenScreenRouteProp = RouteProp<RootStackParamList, 'stolen'>;

export default function StolenScreen({ navigation }: any) {
  const [recipeObject, setRecipeObject] = useState<any>(null);
  const route = useRoute<StolenScreenRouteProp>();
  const { recipeId, usId } = route.params;
  console.log(`User id: `, usId);

  const fetchMealById = async (id: string) => {
    try {
      console.log('Fetching meal with ID:', id);
      const response = await api.getMealById(id);

      if (response?.meals) {
        setRecipeObject(response.meals[0]);
      } else {
        console.warn('No meals found for this ID:', id);
      }
    } catch (err) {
      console.error('API error:', err);
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    console.log('Recipe ID received:', recipeId);
    if (recipeId) {
      fetchMealById(recipeId);
    } else {
      console.warn('Recipe ID is missing');
    }
  }, []);

  const handleDelete = async () => {
    removeRecipe(usId, recipeObject.idMeal);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Recipe Details</Text>
        {recipeObject ? (
          <View style={styles.recipeContainer}>
            <Image source={{ uri: recipeObject.strMealThumb }}style={styles.recipeImage}/>
            <Text style={styles.recipeName}>{recipeObject.strMeal}</Text>
            <Text style={styles.recipeCategory}>Category: {recipeObject.strCategory}</Text>
            <Text style={styles.recipeInstructions}>{recipeObject.strInstructions}</Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
        <Button title="Delete this recipe" onPress={handleDelete}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  recipeCategory: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  recipeInstructions: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },

});
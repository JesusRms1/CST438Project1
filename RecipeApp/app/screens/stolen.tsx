import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, View, StyleSheet, Alert,Image } from 'react-native';
import React,{ useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import api from './apiServices';
import { ScrollView } from 'react-native-gesture-handler';


type RootStackParamList = {
  stolen: { recipeId: string }; 
};


type StolenScreenRouteProp = RouteProp<RootStackParamList, "stolen">;

export default function StolenScreen() {
  const [recipeObject, setRecipeObject] = useState<any>(null);
  const navigation= useNavigation()
  const route = useRoute<StolenScreenRouteProp>(); 
  const { recipeId } = route.params; 

  
    
  const fetchMealById = async (id: string) => {
    try {
      console.log("Fetching meal with ID:", id);
      const response = await api.getMealById(id);
      // console.log("API response:", response);

      if (response?.meals) {
        // console.log("Meal found:", JSON.stringify( response.meals[0], null, 2));
        setRecipeObject(response.meals[0]); 
       
      } else {
        console.warn("No meals found for this ID:", id);
      }
    } catch (err) {
      console.error("API error:", err);
      Alert.alert("Error", err.message);
    }
  };


  useEffect(()=>{
    console.log("Recipe ID received:", recipeId); // Check if recipeId is received
  if (recipeId) {
    fetchMealById(recipeId);
  } else {
    console.warn("Recipe ID is missing");
  }

  },[]);

  return (
    <ScrollView>
          <View>
    <Text>Recipe ID: {recipeId}</Text>

    {recipeObject ? (
      <View>
        <Image source={{uri: recipeObject.strMealThumb}}  style={{ width: 200, height: 200 }} />
        <Text>Recipe Name: {recipeObject.strMeal}</Text>
        <Text>Category: {recipeObject.strCategory}</Text>
        <Text>Instructions: {recipeObject.strInstructions}</Text>
        
      </View>
    ) : (
      <Text>Loading...</Text> 
    )}
  </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

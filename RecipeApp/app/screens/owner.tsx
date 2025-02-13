import { Text, View, StyleSheet, Alert } from 'react-native';
import CardComponent from '@/components/card_component';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecipes, getUser, recipeTable } from './recipeappDB';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RecipeComponent from '@/components/recipe_component';
import api from './apiServices';

//screen will display content made by CURRENT user
export default function OwnerScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);//this access the recipes table
  const [apiRecipe, setApiRecipe] = useState<any[]>([]); //uses recipe table to summon api
  //   useEffect(() => {
  //     recipeTable();
  // }, []);
  useEffect(() => {
    const getUserSession = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
      if (storedUsername) {
        const user = await getUser(storedUsername);
        setUserDetails(user);
      }
    };

    getUserSession();
  }, []);

  useEffect(() => {
    if (userDetails && userDetails[0]?.id) {
      setUserId(userDetails[0]?.id);
    }
  }, [userDetails]);

  //getting recipes
  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (userId) {
        const recipes = await getRecipes(userId);
        setUserRecipes(recipes);
      }
    };
    console.log("User ID:", userId);
    console.log("Recipes:", userRecipes);
    fetchUserRecipes();
  }, [userId]);

  const handlePrint = async () => {
    //pretty print
    console.log(`User ID: ${userId}`);
    console.log("Recipes:\n", JSON.stringify(userRecipes, null, 2));
  }

  const fetchMealById = async( id:string) =>{
    try{
      const response = await api.getMealById(id);
      if (response.meals) {
        setApiRecipe((prevRecipes) => [...prevRecipes, ...response.meals]); 
      }
    }catch(err){
      Alert.alert(`Error`, err.message);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (userRecipes.length > 0) {
        const mealIds = userRecipes.map((recipe) => recipe.recipe_id.toString());
        for (const id of mealIds) {
          await fetchMealById(id);
        }
      }
    };
    fetchRecipes();
  }, [userRecipes]);




  return (
    <ScrollView>
        {apiRecipe.map((recipe, index) => (
          <View key={index}>
            <RecipeComponent key={index} recipe={recipe} index={index} />
          </View>
        ))}
     

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
  container1: {
    flex: 1,
    backgroundColor: '#25292e',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

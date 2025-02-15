import { Text, View, StyleSheet, Alert, Touchable, TouchableOpacity } from 'react-native';
import CardComponent from '@/components/card_component';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecipes, getUser, recipeTable, wipeUserRecipes } from './recipeappDB';
import { Button } from 'react-native-elements';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import RecipeComponent from '@/components/recipe_component';
import api from './apiServices';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



//screen will display recipes owned by CURRENT user
export default function OwnerScreen({ navigation }: any) {
  const [username, setUsername] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);//this access the recipes table
  const [apiRecipe, setApiRecipe] = useState<any[]>([]); //uses recipe table to summon api
  const [refreshing, setRefreshing] = React.useState(false);  //manual reset

  //reset does nothing...
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setApiRecipe([]);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  

  //get user data
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
  //get the id from user
  useEffect(() => {
    if (userDetails && userDetails[0]?.id) {
      setUserId(userDetails[0]?.id);
    }
  }, [userDetails]);

  //======================getting recipes from user using recipes table
  // useEffect(() => {
  //   const fetchUserRecipes = async () => {
  //     if (userId) {
  //       const recipes = await getRecipes(userId);
  //       setUserRecipes(recipes);
  //     }
  //   };
  //   console.log("User ID:", userId);
  //   console.log("Recipes:", userRecipes);
  //   fetchUserRecipes();
  // }, [userId]);

  //====================focus effect fetchUserRecipes variant
  useFocusEffect(
    useCallback(() => {
      const fetchUserRecipes = async () => {
        if (userId) {
          //these 2 gotta clear or we see duplicates
          setUserRecipes([]); 
          setApiRecipe([]); 

          const recipes = await getRecipes(userId);
          const uniqueRecipes = Array.from(
          new Map(recipes.map(recipe => [recipe.recipe_id, recipe])).values()
        );

        setUserRecipes(uniqueRecipes); 
      }
      };
  
      console.log("User ID:", userId);
      console.log("Recipes:", userRecipes);
  
      fetchUserRecipes();
      //clear again
      return () => {
        setUserRecipes([]); 
        setApiRecipe([]); 
      };
  
    }, [userId]) //  
  );

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

  //====================focuseffect fetch recipes variant
  // useFocusEffect(
  //   useCallback(()=>{
  //     const fetchRecipes =async() =>{
  //       if(userRecipes.length>0){
  //         setApiRecipe([]);
  //         const mealIds = userRecipes.map((recipe) => recipe.recipe_id.toString());
  //         for(const id of mealIds){
  //           await fetchMealById(id);
  //         }
  //       }
  //     };
  //     fetchRecipes();
  //   },[userRecipes])
  // );





  //==================og code that doesn't update after leaving search
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

  //=================wipe user recipes for debug
  const handleWipe =async ()=>{
    await wipeUserRecipes(userId);
    console.log("User data wiped?")
  }
  
  const handleRecipePage = async(recipeId:string)=>{
    console.log(`RecipeID inside press: ${recipeId}`)
    navigation.navigate("RecipeInfo",{
      recipeId,
    usId:userId});
  };




  return (
    <SafeAreaProvider>
      <Button title={"WIPE DATA"} onPress={handleWipe}/>
          <ScrollView
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
             <Text>Pull down to update?</Text> 
        {apiRecipe.map((recipe, index) => (
          <View key={index}>
            <TouchableOpacity key={index} onPress={()=>handleRecipePage(recipe.idMeal)}>
             <RecipeComponent key={index} recipe={recipe} index={index} />
            </TouchableOpacity>
          </View>
        ))}
     

    </ScrollView>
    </SafeAreaProvider>


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

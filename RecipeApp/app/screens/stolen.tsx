import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import React,{ useEffect } from 'react';

// Define navigation parameters
type RootStackParamList = {
  stolen: { recipeId: string }; // Ensure this matches your navigation key
};

// ✅ Correctly type the route
type StolenScreenRouteProp = RouteProp<RootStackParamList, "stolen">;

export default function StolenScreen() {
  const route = useRoute<StolenScreenRouteProp>(); // ✅ Fix: Add type
  const { recipeId } = route.params; // ✅ Now TypeScript recognizes `recipeId`

  useEffect(() => {
    console.log("Recipe ID received:", recipeId);
    // Call your API or database function here with recipeId
  }, [recipeId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipe ID: {recipeId}</Text>
      <Text style={styles.text}>Stolen screen</Text>
    </View>
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

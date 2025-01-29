import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';
 const AccountScreen = () => {
  const [user, setUser] = useState({
    name: 'Jesus Ramos',
    email: 'abc123@gmail.com',
    recipeList: 'Place Holder for User recipeList'
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>RecipeList:</Text>
      <Text style={styles.value}>{user.recipeList}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});
export default AccountScreen;
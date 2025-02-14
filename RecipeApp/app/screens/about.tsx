import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, getRecipeCount } from './recipeappDB';

export default function AboutScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

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
    const fetchRecipeCount = async () => {
      if (userDetails && userDetails[0]?.id) {
        const count1 = await getRecipeCount(userDetails[0]?.id);
        setCount(count1);
      }
    };

    fetchRecipeCount();
  }, [userDetails]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{username ? `Hello, ${username}!` : 'Loading...'}</Text>
      {userDetails ? (
        <>
          <Text style={styles.text}>{`User ID: ${userDetails[0]?.id}`}</Text>
          <Text style={styles.text}>{`User Username: ${userDetails[0]?.username}`}</Text>
          <Text style={styles.text}>{`User Password: ${userDetails[0]?.password}`}</Text>
          <Text style={styles.text}>
            {count !== null ? `Amount of favorite Recipes: ${count}` : 'Loading...'}
          </Text>
        </>
      ) : (
        <Text style={styles.text}>Loading user details...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

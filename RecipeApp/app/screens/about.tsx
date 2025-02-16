import { Text, View, StyleSheet,Image } from 'react-native';
import React, { useEffect, useState,useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, getRecipeCount } from './recipeappDB';
import { useFocusEffect } from '@react-navigation/native';
import api from './apiServices';


export default function AboutScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  useEffect(() => {
   const fetchImage = async () => {
         try {
           const imageUrl = api.getRandomImage();
           setProfilePic(imageUrl);
           console.log('Profile Pic URL:', profilePic);
         } catch (error) {
           console.error('Failed to fetch image:', error);
           setProfilePic(null);
         }
       };

    const getUserSession = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
      if (storedUsername) {
        const user = await getUser(storedUsername);
        setUserDetails(user);
      }
    };

    fetchImage();
    getUserSession();
  }, []);



  useFocusEffect(
    useCallback(() => {

    const fetchRecipeCount = async () => {
      if (userDetails && userDetails[0]?.id) {
        const count1 = await getRecipeCount(userDetails[0]?.id);
        setCount(count1);
      }
    };

    fetchRecipeCount();
  }, [userDetails])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{username ? `Hello, ${username}!` : 'Loading...'}</Text>
      {userDetails ? (
        <>
          <Image source={{ uri: profilePic || ''}} style={styles.profileImage} />
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
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  highlightedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 60,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: '#ddd',
    },
});


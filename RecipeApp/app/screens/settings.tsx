import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserInfo, getUser, deleteAllRecipes, deleteAccount } from './recipeappDB';

export default function AboutScreen({ navigation }) {
  const [username, setUsername] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          const user = await getUser(storedUsername);
          if (user?.length > 0) {
            setNewUsername(user[0].username || '');
            setNewPassword(user[0].password || '');
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleUpdate = async () => {
    if (!username) {
      alert('No user found. Please log in again.');
      return;
    }
     const user1 = await getUser(username);
    const success = await updateUserInfo(user1[0]?.id,newUsername, newPassword);

    if (success) {
      await AsyncStorage.setItem('username', newUsername);
      setUsername(newUsername);
      alert('User details updated successfully!');
      navigation.navigate("Login");
    } else {
      alert('Failed to update user details.');
    }
  };
  const deleteRe = async () => {
      if (!username) {
        alert('No user found. Please log in again.');
        return;
      }

      const user1 = await getUser(username);

      const success = await deleteAllRecipes(user1[0]?.id);

      if (success) {
        alert('Recipes deleted successfully!');
      } else {
        alert('Failed to delete recipes.');
      }
    };
  const signOut = async () => {
        if (!username) {
          alert('No user found. Please log in again.');
          return;
        }

          await AsyncStorage.removeItem('username');
          alert('GoodBye!');
          navigation.navigate("Login");
      };
  const deleteAc = async () => {
        if (!username) {
          alert('No user found. Please log in again.');
          return;
        }

        const user1 = await getUser(username);

        const success = await deleteAccount(user1[0]?.id);

        if (success) {
          await AsyncStorage.removeItem('username');
          alert('User deleted successfully!');
          navigation.navigate("Login");
        } else {
          alert('Failed to delete user.');
        }
      };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update User Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new username"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <View style={{ flexDirection: 'column', gap: 10 }}>
        <Button title="Update Details" onPress={handleUpdate} />
        <Button title="Delete Recipes" onPress={deleteRe} />
        <Button title="Delete Account" onPress={deleteAc} />
        <Button title="Sign out" onPress={signOut} />
      </View>
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
  input: {
    width: '30%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },

});

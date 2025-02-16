import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { loginUser } from './recipeappDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loggedIn = async () => {
    if(!username || !password){
      alert("Please Enter Username and Password");
      return;
    }

    const isLogin = await loginUser(username.toLowerCase(), password);
    if (isLogin) {
        try {
          await AsyncStorage.setItem('username', username.toLowerCase());
          alert(`Welcome, ${username}!`);
          navigation.navigate("Home");
        } catch (error) {
          console.error('Error saving session', error);
        }
    } else {
       alert("Invalid username or password. Try again.");
    }
  };

  const Signup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.UserIn}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.UserIn}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={loggedIn}>
        <Text style={styles.buttonTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Signup}>
        <Text style={styles.signup}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'linear-gradient(135deg, #6e45e2, #88d3ce)',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#000000',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  UserIn: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000000',
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  signup: {
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;

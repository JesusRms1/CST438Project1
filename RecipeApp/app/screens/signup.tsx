import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import {createTables, insertUser, getUser  } from './recipeappDB';

const SignupScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    createTables(); 
}, []);

  const checkUsername = async(username: string) =>{
  const userExist = await getUser(username.toLowerCase());
  return userExist.length > 0;

  }
  const loggedIn = async () => {
    if (!username || !password || !confirmPassword){
      alert("Please fill in all fields.");
      return;

    }
    if (password != confirmPassword){
      alert("Passwords do not match")
      return;
    }
    const userNameExists = await checkUsername(username);
    if(userNameExists){
      alert("Username is taken. Please use another name");
      return;
    }
  const isSignUp = await insertUser(username.toLowerCase(), password);
    if(isSignUp){
      alert("User is now registered!");
      navigation.navigate("Login");

    }
    else {
      alert("Error. Try again");
    }
  
   
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Create Account </Text>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#00000"
        value={username}
        onChangeText={setUsername}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#00000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your password"
        placeholderTextColor="#00000"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
    </View>

    <TouchableOpacity style={styles.button} onPress={loggedIn}>
      <Text style={styles.buttonTxt}>Sign Up</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.signup}>Already have an account? Log In</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,
  backgroundColor: 'linear-gradient(135deg, #6e45e2, #88d3ce)',
},
title: {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#00000',
  marginBottom: 50,
  textAlign: 'center',
  textShadowColor: 'rgba(0,0,0,0.5)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
},
inputContainer: {
  width: '80%',
  marginBottom: 15,
},
label: {
  fontSize: 16,
  color: '#00000',
  marginBottom: 5,
  marginLeft: 5,
},
input: {
  height: 50,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 12,
  paddingHorizontal: 15,
  fontSize: 16,
  backgroundColor: '#fff',
  color: '#333',
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 4,
},
button: {
  marginTop: 20,
  backgroundColor: '#007BFF',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 15,
  shadowColor: '#000',
  shadowOffset: { width: 3, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
},
buttonTxt: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  letterSpacing: 1,
  textTransform: 'uppercase',
},
signup: {
  marginTop: 20,
  fontSize: 18,
  color: '#00000',
  textDecorationLine: 'underline',
  textAlign: 'center',
},
});

export default SignupScreen;
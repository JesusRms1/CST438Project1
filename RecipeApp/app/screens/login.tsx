import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from 'react';

const AccountScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< HEAD:RecipeApp/app/login.tsx
<<<<<<< Updated upstream:RecipeApp/app/login.tsx
<<<<<<< Updated upstream:RecipeApp/app/login.tsx
<<<<<<< Updated upstream:RecipeApp/app/login.tsx
<<<<<<< Updated upstream:RecipeApp/app/login.tsx
=======
=======
>>>>>>> Stashed changes:RecipeApp/app/screens/login.tsx
=======
>>>>>>> Stashed changes:RecipeApp/app/screens/login.tsx
=======
>>>>>>> Stashed changes:RecipeApp/app/screens/login.tsx
  const loggedIn = async () => {
    if(!username || !password){
      alert("Please Enter Username and Password");
      return;

    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      interface loginResponse{
      token?: string;
      username?: string;
      message?: string;
      }
      
      const data: loginResponse = await response.json();
      if (response.ok && data.username){
        alert (`Welcome ${data.username}`);
        navigation.navigate("Home");
    // Navigate to home screen (you can configure this later)
      }else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
    
  };

>>>>>>> Stashed changes:RecipeApp/app/screens/login.tsx
  const Signup = () => {
    console.log("Navigate to Signup Screen");
    // Add directions to signup page
  };
=======
>>>>>>> main:RecipeApp/app/screens/login.tsx
  const loggedIn = () => {
    navigation.navigate("Home");
    // Navigate to home screen (you can configure this later)
  };

  const Signup = () => {
    navigation.navigate("Signup"); // Navigate to Signup screen
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  UserIn: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signup: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;

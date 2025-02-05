import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from 'react';

const AccountScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

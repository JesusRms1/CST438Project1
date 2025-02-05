import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from './screens/login'; // Your login screen
import SignupScreen from './screens/signup';   // Your signup screen
import HomeScreen from './(tabs)/home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={AccountScreen} options={{
                                                                       title: 'Login',
                                                                        headerShown: false
                                                                     }}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

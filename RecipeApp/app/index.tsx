import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';
import RecipeInfoScreen from './screens/stolen';


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
        <Stack.Screen name="Home" component={HomeScreen} options= {{
                                                             headerLeft: null
                                                           }}/>
        <Stack.Screen name="RecipeInfo" component={RecipeInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

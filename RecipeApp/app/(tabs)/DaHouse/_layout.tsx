import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
// const Tab = createMaterialTopTabNavigator();

//the two buttons that appear at HOME to SWITCH between User contnent(owner) and Saved Content (stolen)
import OwnerScreen from './owner';  
import StolenScreen from './stolen';  

const Tab = createMaterialTopTabNavigator();
export default function HomeLayout() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          tabBarInactiveTintColor: '#888', // Inactive tab color (adjust as needed)
          tabBarStyle: { backgroundColor: '#25292e' },
          tabBarIndicatorStyle: { backgroundColor: '#ffd33d' }, // Line under active tab
        }}
      >
        <Tab.Screen 
          name="owner" 
          component={OwnerScreen} 
          options={{ title: 'Your Stuff' }}
        />
        <Tab.Screen 
          name="stolen" 
          component={StolenScreen} 
          options={{ title: 'Saved Stuff' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
    

}

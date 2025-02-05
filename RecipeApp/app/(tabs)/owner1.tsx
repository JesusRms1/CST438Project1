import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from '@/components/card_component';
import ProfileScreen from './about';
import SearchScreen from './search';
import SettingsScreen from './settings';
import SubScreen1 from './DaHouse/owner';
import SubScreen2 from './DaHouse/stolen';

// Create Tab Navigators
const MainTab = createBottomTabNavigator();
const OwnerTab = createBottomTabNavigator();

// Nested Tab Navigator for Owner
const OwnerScreen = () => {
  return (
    <OwnerTab.Navigator screenOptions={{ headerShown: false }}>
      <OwnerTab.Screen name="SubTab1" component={SubScreen1} />
      <OwnerTab.Screen name="SubTab2" component={SubScreen2} />
    </OwnerTab.Navigator>
  );
};

// Main Home Screen with Tabs
export default function HomeScreen() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="Owner" component={OwnerScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
      <MainTab.Screen name="Search" component={SearchScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
  },
  text: {
    color: '#fff',
  },
});

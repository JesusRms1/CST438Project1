import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import CardComponent from '@/components/card_component';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './about';
import SearchScreen from './search';
import SettingsScreen from './settings';
import Stuff from './DaHouse/owner';
import Saved from './DaHouse/stolen';

// Create Tab Navigators
const MainTab = createBottomTabNavigator();
const HomeTab = createBottomTabNavigator();
const UserTab = createBottomTabNavigator();

// Nested Tab Navigator for Owner
const HomeMScreen = () => {
  return (
    <HomeTab.Navigator screenOptions={{ headerShown: false }}>
      <HomeTab.Screen name="Your Recipes" component={Stuff}
      options={{
                title: 'Recipes',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'document-text-sharp' : 'document-text-outline'} color={color} size={24} />
                ),
                }}
      />
      <HomeTab.Screen name="Your Saved Recipes" component={Saved}
      options={{
                title: 'Saved',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'bookmark-sharp' : 'bookmark-outline'} color={color} size={24} />
                ),
                }}/>
    </HomeTab.Navigator>
  );
};
const UserScreen = () => {
  return (
    <UserTab.Navigator screenOptions={{ headerShown: false }}>
      <UserTab.Screen name="Profile" component={ProfileScreen}
      options={{
          title: 'About User',
          tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
            }}/>
      <UserTab.Screen name="Settings" component={SettingsScreen} options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'cog-sharp' : 'cog-outline'} color={color} size={24} />
           ),
           }} />
    </UserTab.Navigator>
  );
};

// Main Home Screen with Tabs
export default function HomeScreen() {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen name="Owner" component={HomeMScreen}
      options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
        }}/>
      <MainTab.Screen name="Search" component={SearchScreen}
      options={{
      title: 'Search',
      tabBarIcon: ({ color, focused }) => (
      <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
      ),
       }}/>
      <MainTab.Screen name="Profile" component={UserScreen}
      options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
          ),
          }}
      />

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

// screenOptions should be defined separately
const screenOptions = {
  tabBarActiveTintColor: '#ffd33d',
  headerStyle: {
    backgroundColor: '#25292e',
  },
  headerShadowVisible: false,
  headerTintColor: '#fff',
  tabBarStyle: {
    backgroundColor: '#25292e',
  },
};



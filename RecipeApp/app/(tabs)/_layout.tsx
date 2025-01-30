import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// the 4 buttons that are ALWAYS at bottom of screen
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >

      <Tabs.Screen
        name="DaHouse"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About User',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cog-sharp' : 'cog-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
          ),
        }}
      />

    </Tabs>
  );
}

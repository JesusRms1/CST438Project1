import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// const Tab = createMaterialTopTabNavigator();

//the two buttons that appear at HOME to SWITCH between User contnent(owner) and Saved Content (stolen)
export default function HomeLayout() {
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
      name="owner" 
      options={{ 
        title: 'Your Stuff' ,
      }}
    />

     <Tabs.Screen
        name="stolen"
        options={{
          title: 'Saved Stuff',
        }}
      />

    </Tabs>
   
    
  );
}

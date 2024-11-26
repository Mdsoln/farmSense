import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screen components
import SoilAnalysisScreen from './components/src/screens/SoilAnalysisScreen';
import EducationScreen from './components/src/screens/EducationScreen';
import CameraScreen from './components/src/screens/CameraScreen';
import ShopScreen from './components/src/screens/ShopScreen';
import SettingsScreen from './components/src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="SoilAnalysis"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Determine the icon for each route
            if (route.name === 'SoilAnalysis') {
              iconName = focused ? 'leaf' : 'leaf-outline'; 
            } else if (route.name === 'Education') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Shop') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return the icon with size and color
            return <Ionicons name={`ios-${iconName}`} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 14, // Adjust font size for tab labels
            fontWeight: '600', // Adjust font weight for tab labels
          },
          tabBarStyle: {
            backgroundColor: '#f2f2f2', // Background color for the tab bar
            borderTopWidth: 1, // Add border to the top
            borderTopColor: '#ccc', // Set color of the top border
          },
          tabBarActiveTintColor: '#4CAF50', // Active tab icon color
          tabBarInactiveTintColor: '#8e8e8e', // Inactive tab icon color
        })}
      >
        {/* Define each tab screen */}
        <Tab.Screen name="SoilAnalysis" component={SoilAnalysisScreen} />
        <Tab.Screen name="Education" component={EducationScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

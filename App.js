import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AppProvider } from './src/context/AppContext';
import { colors } from './src/constants/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Wins':
                  iconName = 'checkmark-circle';
                  break;
                case 'Calendar':
                  iconName = 'calendar';
                  break;
                case 'Rewards':
                  iconName = 'gift';
                  break;
                case 'Profile':
                  iconName = 'person';
                  break;
                default:
                  iconName = 'home';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopColor: '#F0F0F0',
              paddingBottom: 8,
              paddingTop: 8,
              height: 70,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Wins" component={TaskScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Rewards" component={RewardsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}

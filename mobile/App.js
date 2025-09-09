import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { NavigationContainer, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme as PaperLightTheme } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import LanguageSelectScreen from './src/screens/LanguageSelectScreen';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/home/DashboardScreen';
import MedicinesScreen from './src/screens/home/MedicinesScreen';
import RecordsScreen from './src/screens/home/RecordsScreen';
import MoreScreen from './src/screens/home/MoreScreen';
import { AppI18nProvider } from './src/i18n/i18n';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const brandTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#0B6E4F', // health green
    secondary: '#0D47A1', // govt blue tone
    tertiary: '#FF8F00', // saffron/orange highlight
    background: '#F6FAFF',
    surface: '#FFFFFF',
  },
  roundness: 10,
};

const navTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    primary: brandTheme.colors.primary,
    background: brandTheme.colors.background,
    card: brandTheme.colors.surface,
    text: '#0A2540',
    border: '#E3E8EF',
  },
};

export default function App() {
  return (
    <AppI18nProvider>
      <PaperProvider theme={brandTheme}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
          <Stack.Navigator initialRouteName="Language" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Language" component={LanguageSelectScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Home" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppI18nProvider>
  );
}

function MainTabs() {
  // Central QR FAB-like tab by styling
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: brandTheme.colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: { height: 64, paddingBottom: 10, paddingTop: 8 },
        tabBarIcon: ({ color, size, focused }) => null, // icons set per-screen below
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Medicines"
        component={MedicinesScreen}
        options={{
          tabBarLabel: 'Medicines',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="pill" color={color} />,
        }}
      />
      <Tab.Screen
        name="QR"
        component={DashboardScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FloatingQRButton />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // TODO: navigate to scanner or QR share screen
          },
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          tabBarLabel: 'Records',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="folder" color={color} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <HomeScreenIcon name="dots-horizontal-circle-outline" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

import { Icon as PaperIcon } from 'react-native-paper';
function HomeScreenIcon({ name, color }) {
  return <PaperIcon source={name} color={color} size={24} />;
}

import { View as RNView } from 'react-native';
function FloatingQRButton() {
  return (
    <RNView style={{
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: brandTheme.colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -12,
      shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
      elevation: 6,
    }}>
      <PaperIcon source="qrcode-scan" color="#FFFFFF" size={30} />
    </RNView>
  );
}

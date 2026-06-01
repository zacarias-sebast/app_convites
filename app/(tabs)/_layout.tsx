// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import {
    Building2,
    Home,
    MapPin,
    Search,
    Smartphone,
    Users,
} from 'lucide-react-native';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#f43f5e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 4 },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      {/* Mesas */}
      <Tabs.Screen
        name="mesas"
        options={{
          title: 'Mesas',
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />

      {/* Acomodação */}
      <Tabs.Screen
        name="acomodacao"
        options={{
          title: 'Acomodação',
          tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
        }}
      />

      {/* Convidados */}
      <Tabs.Screen
        name="convidados"
        options={{
          title: 'Convidados',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      {/* Scanner */}
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color, size }) => <Smartphone size={size} color={color} />,
        }}
      />

      {/* Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
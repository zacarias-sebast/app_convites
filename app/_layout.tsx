// app/_layout.tsx

import { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const naRotaAuth = segments[0] === 'auth';

    if (!session && !naRotaAuth) {
      // Não logado → redireciona para login
      router.replace('/auth');
    } else if (session && naRotaAuth) {
      // Já logado → redireciona para o app
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  // Splash de carregamento inicial
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff1f2' }}>
        <ActivityIndicator size="large" color="#f43f5e" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="qrcode" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
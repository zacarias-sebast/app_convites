// app/(tabs)/index.tsx

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { CheckCircle, Clock, Heart, LayoutGrid, LogOut, ScanLine, Users } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Stats = {
  totalConvidados: number;
  checkinFeitos: number;
  totalMesas: number;
};

// Card de estatística
const StatCard = ({
  icone, label, valor, bgCor,
}: {
  icone: React.ReactNode;
  label: string;
  valor: number;
  bgCor: string;
}) => (
  <View style={{
    flex: 1, backgroundColor: 'white', borderRadius: 20,
    padding: 16, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  }}>
    <View style={{
      width: 40, height: 40, borderRadius: 12,
      backgroundColor: bgCor, alignItems: 'center',
      justifyContent: 'center', marginBottom: 12,
    }}>
      {icone}
    </View>
    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1f2937' }}>{valor}</Text>
    <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 2 }}>{label}</Text>
  </View>
);

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalConvidados: 0, checkinFeitos: 0, totalMesas: 0 });
  const [refreshing, setRefreshing] = useState(false);

  const carregarStats = useCallback(async () => {
    if (!user) return;
    try {
      const [
        { count: totalConvidados },
        { count: checkinFeitos },
        { count: totalMesas },
      ] = await Promise.all([
        supabase.from('convidados').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('convidados').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status_checkin', true),
        supabase.from('mesas').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      ]);
      setStats({
        totalConvidados: totalConvidados || 0,
        checkinFeitos: checkinFeitos || 0,
        totalMesas: totalMesas || 0,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => { carregarStats(); }, [carregarStats]);

  const percentual = stats.totalConvidados > 0
    ? Math.round((stats.checkinFeitos / stats.totalConvidados) * 100)
    : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff1f2' }} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); carregarStats(); }}
            tintColor="#f43f5e"
          />
        }
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Heart size={20} color="#f43f5e" fill="#f43f5e" />
              <Text style={{ color: '#f43f5e', fontWeight: '700', fontSize: 13, letterSpacing: 1 }}>
                WEDDING MANAGER
              </Text>
            </View>
            <TouchableOpacity onPress={signOut} style={{ padding: 6 }}>
              <LogOut size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards de estatísticas */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <StatCard
              icone={<Users size={20} color="#f43f5e" />}
              label="Convidados"
              valor={stats.totalConvidados}
              bgCor="#fff1f2"
            />
            <StatCard
              icone={<CheckCircle size={20} color="#10b981" />}
              label="Check-ins"
              valor={stats.checkinFeitos}
              bgCor="#d1fae5"
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <StatCard
              icone={<LayoutGrid size={20} color="#8b5cf6" />}
              label="Mesas"
              valor={stats.totalMesas}
              bgCor="#ede9fe"
            />
            <StatCard
              icone={<Clock size={20} color="#f59e0b" />}
              label="Aguardando"
              valor={stats.totalConvidados - stats.checkinFeitos}
              bgCor="#fef3c7"
            />
          </View>
        </View>

        {/* Barra de progresso */}
        <View style={{
          marginHorizontal: 20, marginTop: 16,
          backgroundColor: 'white', borderRadius: 20, padding: 20,
          shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontWeight: '600', color: '#1f2937', fontSize: 15 }}>
              Progresso do Check-in
            </Text>
            <Text style={{ color: '#f43f5e', fontWeight: 'bold', fontSize: 18 }}>
              {percentual}%
            </Text>
          </View>
          <View style={{ backgroundColor: '#f3f4f6', borderRadius: 99, height: 10 }}>
            <View style={{
              backgroundColor: '#f43f5e', height: 10,
              borderRadius: 99, width: `${percentual}%`,
            }} />
          </View>
          <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 8 }}>
            {stats.checkinFeitos} de {stats.totalConvidados} convidados confirmados
          </Text>
        </View>

        {/* Ações rápidas */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 40 }}>
          <Text style={{ fontWeight: '600', color: '#1f2937', fontSize: 15, marginBottom: 12 }}>
            Ações Rápidas
          </Text>

          {/* Botão Scanner — destaque */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/scanner')}
            style={{
              backgroundColor: '#f43f5e', borderRadius: 20,
              padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12,
            }}
            activeOpacity={0.8}
          >
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 14, marginRight: 16 }}>
              <ScanLine size={26} color="white" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Iniciar Check-in</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 }}>
                Escanear QR Codes na entrada
              </Text>
            </View>
          </TouchableOpacity>

          {/* Botões secundários */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/convidados')}
              style={{
                flex: 1, backgroundColor: 'white', borderRadius: 16,
                padding: 16, alignItems: 'center',
                shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
              }}
              activeOpacity={0.8}
            >
              <Users size={26} color="#f43f5e" />
              <Text style={{ color: '#374151', fontWeight: '600', fontSize: 13, marginTop: 8 }}>
                Convidados
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/mesas')}
              style={{
                flex: 1, backgroundColor: 'white', borderRadius: 16,
                padding: 16, alignItems: 'center',
                shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
              }}
              activeOpacity={0.8}
            >
              <LayoutGrid size={26} color="#8b5cf6" />
              <Text style={{ color: '#374151', fontWeight: '600', fontSize: 13, marginTop: 8 }}>
                Mesas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
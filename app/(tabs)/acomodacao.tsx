// app/(tabs)/acomodacao.tsx

import { useAuth } from '@/hooks/useAuth';
import { Convidado, Mesa, supabase } from '@/lib/supabase';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MesaComConvidados = Mesa & {
  convidados: Convidado[];
};

type MesaExpandida = {
  mesa_id: string;
  expandida: boolean;
};

export default function AcomodacaoScreen() {
  const { user } = useAuth();
  const [mesas, setMesas] = useState<MesaComConvidados[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [mesasExpandidas, setMesasExpandidas] = useState<Map<string, boolean>>(new Map());

  const carregarDados = useCallback(async () => {
    if (!user) return;
    try {
      setCarregando(true);

      // Busca todas as mesas do usuário
      const { data: mesasData, error: mesasError } = await supabase
        .from('mesas')
        .select('*')
        .eq('user_id', user.id);

      if (mesasError) throw mesasError;

      // Para cada mesa, busca os convidados
      const mesasComConvidados: MesaComConvidados[] = await Promise.all(
        (mesasData || []).map(async (mesa) => {
          const { data: convidados } = await supabase
            .from('convidados')
            .select('*')
            .eq('mesa_id', mesa.id)
            .eq('user_id', user.id);

          return {
            ...mesa,
            convidados: convidados || [],
          };
        })
      );

      // Ordena por número de mesa
      mesasComConvidados.sort((a, b) => a.numero - b.numero);
      setMesas(mesasComConvidados);

      // Expande a primeira mesa por padrão
      if (mesasComConvidados.length > 0) {
        const newMap = new Map();
        newMap.set(mesasComConvidados[0].id, true);
        setMesasExpandidas(newMap);
      }
    } catch (erro) {
      console.error('Erro ao carregar acomodação:', erro);
    } finally {
      setCarregando(false);
    }
  }, [user]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const toggleMesa = (mesaId: string) => {
    const newMap = new Map(mesasExpandidas);
    newMap.set(mesaId, !(newMap.get(mesaId) ?? false));
    setMesasExpandidas(newMap);
  };

  const onRefresh = useCallback(async () => {
    setAtualizando(true);
    await carregarDados();
    setAtualizando(false);
  }, [carregarDados]);

  if (carregando) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#f43f5e" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={atualizando} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
            Acomodação
          </Text>
          <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 4 }}>
            {mesas.length} mesa{mesas.length !== 1 ? 's' : ''} cadastrada{mesas.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Mesas */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {mesas.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <MapPin size={48} color="#d1d5db" />
              <Text style={{ color: '#9ca3af', fontSize: 16, marginTop: 12 }}>
                Nenhuma mesa cadastrada
              </Text>
            </View>
          ) : (
            mesas.map((mesa) => {
              const expandida = mesasExpandidas.get(mesa.id) ?? false;
              const totalConvidados = mesa.convidados.length;
              const checkinFeitos = mesa.convidados.filter((c) => c.status_checkin).length;

              return (
                <View key={mesa.id} style={{ marginBottom: 12 }}>
                  {/* Header da Mesa */}
                  <TouchableOpacity
                    onPress={() => toggleMesa(mesa.id)}
                    style={{
                      backgroundColor: '#fff1f2',
                      borderRadius: 16,
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: '#fda4af',
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <MapPin size={20} color="#f43f5e" />
                        <View>
                          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1f2937' }}>
                            Mesa {mesa.numero}
                          </Text>
                          {mesa.descricao && (
                            <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                              {mesa.descricao}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Info + Toggle */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 99,
                          borderWidth: 1,
                          borderColor: '#f43f5e',
                        }}
                      >
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#f43f5e' }}>
                          {checkinFeitos}/{totalConvidados}
                        </Text>
                      </View>
                      {expandida ? (
                        <ChevronUp size={20} color="#f43f5e" />
                      ) : (
                        <ChevronDown size={20} color="#f43f5e" />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Lista de Convidados */}
                  {expandida && (
                    <View
                      style={{
                        marginTop: 8,
                        borderLeftWidth: 2,
                        borderLeftColor: '#fda4af',
                        paddingLeft: 16,
                        marginLeft: 8,
                      }}
                    >
                      {totalConvidados === 0 ? (
                        <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
                          <Text style={{ color: '#9ca3af', fontSize: 13 }}>
                            Nenhum convidado nesta mesa
                          </Text>
                        </View>
                      ) : (
                        mesa.convidados.map((convidado) => (
                          <View
                            key={convidado.id}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: 12,
                              padding: 12,
                              marginBottom: 8,
                              borderWidth: 1,
                              borderColor: convidado.status_checkin ? '#d1fae5' : '#f3f4f6',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '600',
                                  color: '#1f2937',
                                  marginBottom: 4,
                                }}
                                numberOfLines={1}
                              >
                                {convidado.nome}
                              </Text>
                              <View
                                style={{
                                  alignSelf: 'flex-start',
                                  paddingHorizontal: 6,
                                  paddingVertical: 2,
                                  borderRadius: 99,
                                  backgroundColor: convidado.status_checkin
                                    ? '#d1fae5'
                                    : '#f3f4f6',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontWeight: '600',
                                    color: convidado.status_checkin
                                      ? '#065f46'
                                      : '#6b7280',
                                  }}
                                >
                                  {convidado.status_checkin ? '✓ Check-in' : 'Aguardando'}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))
                      )}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

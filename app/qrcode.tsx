// app/qrcode.tsx

import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { ArrowLeft, Heart, Share2 } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QRCodeScreen() {
  const { token, nome, mesa_numero, mesa_capacidade, mesa_descricao } = useLocalSearchParams<{
    token: string;
    nome: string;
    mesa_numero?: string;
    mesa_capacidade?: string;
    mesa_descricao?: string;
  }>();

  const qrRef = useRef<any>(null);
  const [compartilhando, setCompartilhando] = useState(false);

  if (!token) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text style={{ color: '#9ca3af' }}>Token inválido.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: '#f43f5e', fontWeight: '600' }}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const compartilhar = async () => {
    try {
      setCompartilhando(true);

      const disponivel = await Sharing.isAvailableAsync();
      if (!disponivel) {
        Alert.alert('Indisponível', 'Compartilhamento não está disponível neste dispositivo.');
        return;
      }

      // Pega o base64 do QR Code via toDataURL
      const base64: string = await new Promise((resolve, reject) => {
        if (!qrRef.current?.toDataURL) {
          reject(new Error('QR Code ainda não está pronto.'));
          return;
        }
        qrRef.current.toDataURL((data: string) => resolve(data));
      });

      // Compartilha direto como data URI
      const dataURI = `data:image/png;base64,${base64}`;
      await Sharing.shareAsync(dataURI, {
        mimeType: 'image/png',
        UTI: 'public.png',
        dialogTitle: `Convite de ${nome}`,
      });

    } catch (erro: any) {
      Alert.alert('Erro', erro.message ?? 'Não foi possível compartilhar.');
    } finally {
      setCompartilhando(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
        }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8, marginRight: 8 }}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937', flex: 1 }} numberOfLines={1}>
            Convite Digital
          </Text>
          <TouchableOpacity onPress={compartilhar} disabled={compartilhando} style={{ padding: 8 }}>
            <Share2 size={22} color="#f43f5e" />
          </TouchableOpacity>
        </View>

        {/* Cartão do convite */}
        <View style={{
          marginHorizontal: 20, marginTop: 12,
          borderRadius: 24, overflow: 'hidden',
          borderWidth: 1, borderColor: '#fce7f3',
          backgroundColor: 'white',
          shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
        }}>

          {/* Topo rosa */}
          <View style={{ backgroundColor: '#f43f5e', paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Heart size={14} color="white" fill="white" />
              <Text style={{ color: 'white', fontSize: 11, fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase', opacity: 0.9 }}>
                Você está convidado
              </Text>
              <Heart size={14} color="white" fill="white" />
            </View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              {nome}
            </Text>
            {mesa_numero && mesa_numero !== 'Sem mesa' && (
              <View style={{ marginTop: 12, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14, opacity: 0.9 }}>Mesa {mesa_numero}</Text>
                {mesa_capacidade && mesa_capacidade !== '0' && (
                  <Text style={{ color: 'white', fontSize: 12, opacity: 0.8, marginTop: 4 }}>
                    {mesa_capacidade} pessoa{parseInt(mesa_capacidade) !== 1 ? 's' : ''}
                  </Text>
                )}
                {mesa_descricao && (
                  <Text style={{ color: 'white', fontSize: 12, opacity: 0.8, marginTop: 4 }}>{mesa_descricao}</Text>
                )}
              </View>
            )}
          </View>

          {/* Área do QR Code */}
          <View style={{ alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24, backgroundColor: 'white' }}>
            <View style={{
              backgroundColor: 'white', padding: 16, borderRadius: 20,
              borderWidth: 1, borderColor: '#f3f4f6', elevation: 4,
            }}>
              <QRCode
                value={token}
                size={200}
                color="#1f2937"
                backgroundColor="white"
                getRef={(ref) => { qrRef.current = ref; }}
              />
            </View>

            {/* Token legível */}
            <View style={{
              marginTop: 24, backgroundColor: '#f9fafb',
              borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
              width: '100%',
            }}>
              <Text style={{ color: '#9ca3af', fontSize: 11, textAlign: 'center', marginBottom: 4 }}>
                Código de verificação
              </Text>
              <Text style={{ color: '#6b7280', fontSize: 10, textAlign: 'center', fontFamily: 'monospace' }} selectable>
                {token}
              </Text>
            </View>

            <Text style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', marginTop: 20, lineHeight: 20 }}>
              Apresente este QR Code na entrada do evento para realizar o check-in.
            </Text>
          </View>

          {/* Rodapé decorativo */}
          <View style={{
            borderTopWidth: 1, borderTopColor: '#fce7f3',
            paddingVertical: 16, alignItems: 'center',
            backgroundColor: 'white',
          }}>
            <Text style={{ color: '#fda4af', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase' }}>
              ✦  Celebração  ✦
            </Text>
          </View>
        </View>

        {/* Botão compartilhar */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 40 }}>
          <TouchableOpacity
            onPress={compartilhar}
            disabled={compartilhando}
            style={{
              backgroundColor: compartilhando ? '#fda4af' : '#f43f5e',
              borderRadius: 16, paddingVertical: 16,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            }}
            activeOpacity={0.8}
          >
            {compartilhando
              ? <ActivityIndicator color="white" size="small" />
              : <Share2 size={20} color="white" />
            }
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>
              {compartilhando ? 'Preparando...' : 'Compartilhar Convite'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
// app/(tabs)/scanner.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Vibration,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { CheckCircle, XCircle, User, MapPin, Camera } from 'lucide-react-native';
import { supabase, Convidado } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

// Tipo do resultado exibido no modal após o scan
type ResultadoCheckin = {
  sucesso: boolean;
  convidado?: Convidado & { mesas?: { numero: number } | null };
  mensagem: string;
};

// ============================================================
// COMPONENTE: Modal de resultado do check-in
// ============================================================
const ModalResultado = ({
  resultado,
  onFechar,
}: {
  resultado: ResultadoCheckin | null;
  onFechar: () => void;
}) => {
  if (!resultado) return null;

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onFechar}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <View style={{
          backgroundColor: 'white', borderRadius: 28,
          marginHorizontal: 32, overflow: 'hidden',
          width: '100%', maxWidth: 360,
        }}>

          {/* Cabeçalho colorido */}
          <View style={{
            paddingVertical: 36, alignItems: 'center',
            backgroundColor: resultado.sucesso ? '#10b981' : '#f43f5e',
          }}>
            {resultado.sucesso
              ? <CheckCircle size={64} color="white" />
              : <XCircle size={64} color="white" />
            }
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 12 }}>
              {resultado.sucesso ? 'Check-in Confirmado!' : 'Atenção'}
            </Text>
          </View>

          {/* Corpo com info do convidado */}
          <View style={{ padding: 24 }}>
            {resultado.convidado ? (
              <>
                {/* Nome */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10, marginRight: 12 }}>
                    <User size={20} color="#6b7280" />
                  </View>
                  <View>
                    <Text style={{ color: '#9ca3af', fontSize: 11 }}>Convidado</Text>
                    <Text style={{ color: '#1f2937', fontWeight: '600', fontSize: 16 }}>
                      {resultado.convidado.nome}
                    </Text>
                  </View>
                </View>

                {/* Mesa */}
                {resultado.convidado.mesas && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{ backgroundColor: '#f3f4f6', padding: 8, borderRadius: 10, marginRight: 12 }}>
                      <MapPin size={20} color="#6b7280" />
                    </View>
                    <View>
                      <Text style={{ color: '#9ca3af', fontSize: 11 }}>Mesa</Text>
                      <Text style={{ color: '#1f2937', fontWeight: '600', fontSize: 16 }}>
                        Mesa {resultado.convidado.mesas.numero}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Mensagem de erro (ex: já fez check-in) */}
                {!resultado.sucesso && (
                  <View style={{ backgroundColor: '#fff1f2', borderRadius: 12, padding: 12, marginTop: 4 }}>
                    <Text style={{ color: '#f43f5e', fontSize: 13, textAlign: 'center' }}>
                      {resultado.mensagem}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={{ color: '#6b7280', textAlign: 'center', paddingVertical: 8 }}>
                {resultado.mensagem}
              </Text>
            )}

            {/* Botão fechar */}
            <TouchableOpacity
              onPress={onFechar}
              style={{
                marginTop: 20, borderRadius: 14, paddingVertical: 16, alignItems: 'center',
                backgroundColor: resultado.sucesso ? '#10b981' : '#f3f4f6',
              }}
              activeOpacity={0.8}
            >
              <Text style={{
                fontWeight: 'bold', fontSize: 16,
                color: resultado.sucesso ? 'white' : '#6b7280',
              }}>
                {resultado.sucesso ? 'Escanear Próximo' : 'Tentar Novamente'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ============================================================
// TELA PRINCIPAL: Scanner
// ============================================================
export default function ScannerScreen() {
  const { user } = useAuth();
  const [permissao, requestPermissao] = useCameraPermissions();
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoCheckin | null>(null);

  // Animação da linha de scan
  const linhaAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(linhaAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(linhaAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const linhaY = linhaAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  // ============================================================
  // LÓGICA DE CHECK-IN
  // ============================================================
  const realizarCheckin = useCallback(async (token: string) => {
    if (processando || !user) return;
    setProcessando(true);
    Vibration.vibrate(80);

    try {
      // 1. Busca o convidado pelo token do QR Code
      const { data: convidado, error: erroBusca } = await supabase
        .from('convidados')
        .select('*, mesas(numero)')
        .eq('qr_code_token', token)
        .eq('user_id', user.id)
        .single();

      // Token não encontrado
      if (erroBusca || !convidado) {
        setResultado({
          sucesso: false,
          mensagem: 'QR Code inválido ou não reconhecido.\nVerifique se o convite pertence a este evento.',
        });
        return;
      }

      // Já fez check-in anteriormente
      if (convidado.status_checkin) {
        setResultado({
          sucesso: false,
          convidado,
          mensagem: `${convidado.nome} já realizou o check-in anteriormente.`,
        });
        return;
      }

      // 2. Atualiza status_checkin para TRUE no banco
      const { error: erroUpdate } = await supabase
        .from('convidados')
        .update({
          status_checkin: true,
          checkin_at: new Date().toISOString(),
        })
        .eq('id', convidado.id);

      if (erroUpdate) throw erroUpdate;

      // Dupla vibração = sucesso
      Vibration.vibrate([0, 100, 60, 100]);

      setResultado({
        sucesso: true,
        convidado,
        mensagem: 'Check-in realizado com sucesso!',
      });

    } catch (erro: any) {
      setResultado({
        sucesso: false,
        mensagem: erro.message || 'Erro ao processar. Tente novamente.',
      });
    } finally {
      setProcessando(false);
    }
  }, [processando, user]);

  // Dispara ao ler um QR Code pela câmera
  const onBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (!processando && !resultado) {
      realizarCheckin(data);
    }
  };

  // ============================================================
  // TELA: Sem permissão de câmera
  // ============================================================
  if (!permissao) {
    return (
      <View style={{ flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (!permissao.granted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Camera size={64} color="#f43f5e" />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 12 }}>
          Permissão de câmera necessária
        </Text>
        <Text style={{ color: '#9ca3af', textAlign: 'center', marginBottom: 32 }}>
          Para realizar o check-in, precisamos de acesso à câmera do dispositivo.
        </Text>
        <TouchableOpacity
          onPress={requestPermissao}
          style={{ backgroundColor: '#f43f5e', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Conceder Permissão</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ============================================================
  // TELA: Scanner ativo
  // ============================================================
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={resultado ? undefined : onBarCodeScanned}
      >
        <SafeAreaView style={{ flex: 1 }}>

          {/* Título */}
          <View style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 16 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Scanner de Check-in
            </Text>
            <Text style={{ color: '#d1d5db', fontSize: 13, marginTop: 4 }}>
              Aponte para o QR Code do convidado
            </Text>
          </View>

          {/* Área do scanner com cantos decorativos */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 256, height: 256, position: 'relative' }}>

              {/* Cantos do frame */}
              {/* Superior esquerdo */}
              <View style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#f43f5e', borderTopLeftRadius: 8 }} />
              {/* Superior direito */}
              <View style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#f43f5e', borderTopRightRadius: 8 }} />
              {/* Inferior esquerdo */}
              <View style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#f43f5e', borderBottomLeftRadius: 8 }} />
              {/* Inferior direito */}
              <View style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#f43f5e', borderBottomRightRadius: 8 }} />

              {/* Linha animada de scan */}
              {!processando && (
                <Animated.View style={{
                  position: 'absolute', left: 8, right: 8,
                  transform: [{ translateY: linhaY }],
                }}>
                  <View style={{ height: 2, backgroundColor: '#f43f5e', opacity: 0.8, borderRadius: 1 }} />
                </Animated.View>
              )}

              {/* Indicador de processamento */}
              {processando && (
                <View style={{
                  position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12,
                }}>
                  <ActivityIndicator size="large" color="#f43f5e" />
                  <Text style={{ color: 'white', fontSize: 13, marginTop: 8 }}>Verificando...</Text>
                </View>
              )}
            </View>
          </View>

          {/* Rodapé com instrução */}
          <View style={{ paddingBottom: 40, paddingHorizontal: 32, alignItems: 'center' }}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 14 }}>
              <Text style={{ color: '#d1d5db', fontSize: 13, textAlign: 'center', lineHeight: 20 }}>
                O check-in é registrado automaticamente ao escanear o QR Code
              </Text>
            </View>
          </View>

        </SafeAreaView>
      </CameraView>

      {/* Modal de resultado */}
      <ModalResultado resultado={resultado} onFechar={() => setResultado(null)} />
    </View>
  );
}
// app/auth.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Mail, Lock, User } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

type Modo = 'login' | 'cadastro';

export default function AuthScreen() {
  const [modo, setModo] = useState<Modo>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Login com email e senha
  const fazerLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (error) Alert.alert('Erro no login', error.message);
    setLoading(false);
  };

  // Cadastro de novo usuário
  const fazerCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: { data: { full_name: nome.trim() } },
    });
    if (error) {
      Alert.alert('Erro no cadastro', error.message);
    } else {
      Alert.alert(
        'Conta criada! 🎉',
        'Verifique seu e-mail para confirmar o cadastro.',
        [{ text: 'OK', onPress: () => setModo('login') }]
      );
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          {/* Cabeçalho */}
          <View style={{
            backgroundColor: '#f43f5e',
            paddingTop: 48, paddingBottom: 48,
            alignItems: 'center', paddingHorizontal: 32,
          }}>
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16, borderRadius: 24, marginBottom: 16,
            }}>
              <Heart size={36} color="white" fill="white" />
            </View>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
              Wedding Manager
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4 }}>
              Gerencie seu casamento com amor 💍
            </Text>
          </View>

          {/* Formulário */}
          <View style={{ paddingHorizontal: 32, paddingTop: 32, flex: 1 }}>

            {/* Toggle login / cadastro */}
            <View style={{
              flexDirection: 'row', backgroundColor: '#f3f4f6',
              borderRadius: 16, padding: 4, marginBottom: 32,
            }}>
              {(['login', 'cadastro'] as Modo[]).map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setModo(m)}
                  style={{
                    flex: 1, paddingVertical: 12, borderRadius: 12,
                    alignItems: 'center',
                    backgroundColor: modo === m ? 'white' : 'transparent',
                    shadowColor: modo === m ? '#000' : 'transparent',
                    shadowOpacity: 0.06, shadowRadius: 4, elevation: modo === m ? 2 : 0,
                  }}
                >
                  <Text style={{
                    fontWeight: '600', fontSize: 14,
                    color: modo === m ? '#f43f5e' : '#9ca3af',
                  }}>
                    {m === 'login' ? 'Entrar' : 'Cadastrar'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Campo Nome (só no cadastro) */}
            {modo === 'cadastro' && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 6 }}>
                  Nome completo
                </Text>
                <View style={{
                  flexDirection: 'row', alignItems: 'center',
                  borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14,
                  paddingHorizontal: 16, paddingVertical: 13, backgroundColor: '#f9fafb',
                }}>
                  <User size={18} color="#9ca3af" />
                  <TextInput
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Seu nome"
                    placeholderTextColor="#9ca3af"
                    style={{ flex: 1, marginLeft: 10, color: '#1f2937', fontSize: 15 }}
                  />
                </View>
              </View>
            )}

            {/* Campo E-mail */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 6 }}>
                E-mail
              </Text>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14,
                paddingHorizontal: 16, paddingVertical: 13, backgroundColor: '#f9fafb',
              }}>
                <Mail size={18} color="#9ca3af" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@exemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                  style={{ flex: 1, marginLeft: 10, color: '#1f2937', fontSize: 15 }}
                />
              </View>
            </View>

            {/* Campo Senha */}
            <View style={{ marginBottom: 32 }}>
              <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 6 }}>
                Senha
              </Text>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14,
                paddingHorizontal: 16, paddingVertical: 13, backgroundColor: '#f9fafb',
              }}>
                <Lock size={18} color="#9ca3af" />
                <TextInput
                  value={senha}
                  onChangeText={setSenha}
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                  style={{ flex: 1, marginLeft: 10, color: '#1f2937', fontSize: 15 }}
                />
              </View>
            </View>

            {/* Botão principal */}
            <TouchableOpacity
              onPress={modo === 'login' ? fazerLogin : fazerCadastro}
              disabled={loading}
              style={{
                backgroundColor: '#f43f5e', borderRadius: 16,
                paddingVertical: 17, alignItems: 'center',
                shadowColor: '#f43f5e', shadowOpacity: 0.35,
                shadowRadius: 10, elevation: 4,
              }}
              activeOpacity={0.8}
            >
              {loading
                ? <ActivityIndicator color="white" />
                : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    {modo === 'login' ? 'Entrar' : 'Criar conta'}
                  </Text>
              }
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
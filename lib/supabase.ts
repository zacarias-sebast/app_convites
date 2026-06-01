import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Verificação para evitar rodar no Node.js durante o build/SSR
const isWeb = Platform.OS === 'web';
const isServer = typeof window === 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Só usa AsyncStorage se estivermos no ambiente correto
    storage: (!isWeb || !isServer) ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ============================================================
// CICLO DE VIDA DO AUTH
// ============================================================
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// ============================================================
// TIPOS — espelham as tabelas do banco
// ============================================================

export type Profile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
};

export type Mesa = {
  id: string;
  user_id: string;
  numero: number;
  capacidade: number;
  descricao: string | null;
  created_at: string;
};

export type Convidado = {
  id: string;
  user_id: string;
  mesa_id: string | null;
  nome: string;
  email: string | null;
  telefone: string | null;
  qr_code_token: string;
  status_checkin: boolean;
  checkin_at: string | null;
  created_at: string;
  mesas?: Mesa | null;
};

export type ConvidadoInsert = {
  nome: string;
  mesa_id?: string | null;
  email?: string | null;
  telefone?: string | null;
};

export type MesaInsert = {
  numero: number;
  capacidade: number;
  descricao?: string | null;
};
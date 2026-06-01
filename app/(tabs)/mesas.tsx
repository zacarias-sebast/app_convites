

import { useAuth } from '@/hooks/useAuth';
import { Mesa, MesaInsert, supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Edit2,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ============================================================
// COMPONENTE: Card individual do convidado
// ============================================================
type MesasCardProps = {
  mesa: Mesa;
  onPressQR: (mesa: Mesa) => void;
  onEdit: (mesa: Mesa) => void;
  onDelete: (id: string) => void;
};

const MesaCard = ({ mesa, onPressQR, onEdit, onDelete }: MesasCardProps) => (
  <View style={{
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>

        {/* Mesa vinculada */}
        {mesa && (
          <View style={{ flexDirection: 'column', gap: 6, marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MapPin size={14} color="#f43f5e" />
              <Text style={{ color: '#1f2937', fontSize: 14, fontWeight: '600' }}>
                Mesa {mesa.numero}
              </Text>
            </View>
            {mesa.capacidade > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 22 }}>
                <Users size={14} color="#9ca3af" />
                <Text style={{ color: '#6b7280', fontSize: 13 }}>
                  Capacidade: {mesa.capacidade} pessoa{mesa.capacidade !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
            {mesa.descricao && (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginLeft: 22 }}>
                <Text style={{ color: '#9ca3af', fontSize: 13 }}>
                  Descrição: {mesa.descricao}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Botões de ações */}
      <View style={{ flexDirection: 'row', gap: 8, marginLeft: 12 }}>
        <TouchableOpacity
          onPress={() => onEdit(mesa)}
          style={{
            backgroundColor: '#f3f4f6',
            padding: 10,
            borderRadius: 10,
          }}
          activeOpacity={0.7}
        >
          <Edit2 size={18} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(mesa.id)}
          style={{
            backgroundColor: '#fee2e2',
            padding: 10,
            borderRadius: 10,
          }}
          activeOpacity={0.7}
        >
          <Trash2 size={18} color="#f43f5e" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ============================================================
// COMPONENTE: Modal para adicionar convidado
// ============================================================
type ModalAdicionarProps = {
  visible: boolean;
  mesas: Mesa[];
  loading: boolean;
  mesaEditando?: Mesa | null;
  onClose: () => void;
  onSave: (dados: MesaInsert, id?: string) => Promise<void>;
};

const ModalAdicionar = ({ visible, mesas, loading, mesaEditando, onClose, onSave }: ModalAdicionarProps) => {
  const [numero, setNumero] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  useEffect(() => {
    if (mesaEditando) {
      setNumero(mesaEditando.numero.toString());
      setCapacidade(mesaEditando.capacidade.toString());
      setDescricao(mesaEditando.descricao || '');
    }
  }, [mesaEditando]);

  const handleClose = () => {
    setNumero('');
    setCapacidade('');
    setDescricao('');
    setMesaSelecionada(null);
    setMostrarDropdown(false);
    onClose();
  };

  const handleSalvar = async () => {
    if (!numero.trim()) {
      Alert.alert('Atenção', 'O número da mesa é obrigatório.');
      return;
    }
    const parsedCapacidade = capacidade.trim() ? parseInt(capacidade) : 0;
    await onSave({
      numero: parseInt(numero) as number,
      capacidade: isNaN(parsedCapacidade) ? 0 : parsedCapacidade,
      descricao: descricao.trim() || null,
    }, mesaEditando?.id);
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>

          {/* Cabeçalho do modal */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
              {mesaEditando ? 'Editar Mesa' : 'Nova Mesa'}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Número */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Número *</Text>
            <TextInput
              value={numero}
              onChangeText={setNumero}
              placeholder="Número da mesa"
              placeholderTextColor="#9ca3af"
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            {/* Capacidade */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Capacidade</Text>
            <TextInput
              value={capacidade}
              onChangeText={setCapacidade}
              placeholder="Capacidade da mesa"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            {/* Descrição */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Descrição</Text>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição da mesa"
              placeholderTextColor="#9ca3af"
           
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            
              

            {/* Dropdown de mesas */}
            {mostrarDropdown && (
              <View style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                backgroundColor: 'white', marginBottom: 16, overflow: 'hidden',
              }}>
                <TouchableOpacity
                  onPress={() => { setMesaSelecionada(null); setMostrarDropdown(false); }}
                  style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                >
                  <Text style={{ color: '#9ca3af' }}>Sem mesa definida</Text>
                </TouchableOpacity>
                {mesas.map((mesa) => (
                  <TouchableOpacity
                    key={mesa.id}
                    onPress={() => { setMesaSelecionada(mesa); setMostrarDropdown(false); }}
                    style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                  >
                   
                   
                    <Text style={{ color: '#1f2937', fontWeight: '500' }}>
                      Descrição: {mesa.descricao}
                    </Text>
                    <Text style={{ color: '#1f2937', fontWeight: '500' }}>
                      Numero: {mesa.numero}
                    </Text>
                    <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                      Capacidade: {mesa.capacidade} pessoas
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Botão salvar */}
            <TouchableOpacity
              onPress={handleSalvar}
              disabled={loading}
              style={{
                backgroundColor: '#f43f5e', borderRadius: 14,
                paddingVertical: 16, alignItems: 'center', marginTop: 8,
              }}
              activeOpacity={0.8}
            >
              {loading
                ? <ActivityIndicator color="white" />
                : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    {mesaEditando ? 'Atualizar Mesa' : 'Adicionar Mesa'}
                  </Text>
              }
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ============================================================
// TELA PRINCIPAL
// ============================================================
export default function ConvidadosScreen() {
  const { user } = useAuth();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [busca, setBusca] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mesaEditando, setMesaEditando] = useState<Mesa | null>(null);

  // Busca convidados + mesas do banco
  const carregarDados = useCallback(async () => {
    if (!user) return;
    try {
      const { data: convidadosData, error: e1 } = await supabase
        .from('convidados')
        .select('*, mesas(id, numero, capacidade, descricao)')
        .eq('user_id', user.id)
        .order('nome', { ascending: true });

      if (e1) throw e1;

      const { data: mesasData, error: e2 } = await supabase
        .from('mesas')
        .select('*')
        .eq('user_id', user.id)
        .order('numero', { ascending: true });

      if (e2) throw e2;

      setMesas(mesasData || []);
    } catch (erro: any) {
      Alert.alert('Erro', erro.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Adiciona ou atualiza mesa no banco
  const adicionarMesa = async (dados: MesaInsert, id?: string) => {
    if (!user) return;
    setSalvando(true);
    try {
      if (id) {
        // Atualizar mesa existente
        const { error } = await supabase
          .from('mesas')
          .update(dados)
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        setMesaEditando(null);
      } else {
        // Inserir nova mesa
        const { error } = await supabase
          .from('mesas')
          .insert({ ...dados, user_id: user.id });

        if (error) throw error;
      }
      await carregarDados();
    } catch (erro: any) {
      Alert.alert('Erro ao salvar', erro.message);
    } finally {
      setSalvando(false);
    }
  };

  // Deleta mesa do banco
  const deletarMesa = (id: string) => {
    Alert.alert('Excluir mesa', 'Tem certeza que deseja excluir esta mesa?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            const { error } = await supabase
              .from('mesas')
              .delete()
              .eq('id', id)
              .eq('user_id', user?.id);

            if (error) throw error;
            await carregarDados();
          } catch (erro: any) {
            Alert.alert('Erro ao excluir', erro.message);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  // Navega para a tela do QR Code passando token e nome
  const abrirQRCode = (mesa: Mesa) => {
    router.push({
      pathname: '/qrcode',
      params: { token: mesa.id, numero: `Mesa ${mesa.numero} , ${mesa.descricao}, capacidade: ${mesa.capacidade}` },
    });
  };

  const mesasFiltradas = mesas.filter((m) => {
    if (!busca) return true;
    return (
      m.numero.toString().includes(busca) ||
      (m.descricao?.toLowerCase().includes(busca.toLowerCase()) ?? false)
    );
  });

  const totalMesas = mesas.length;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff1f2' }}>
        <ActivityIndicator size="large" color="#f43f5e" />
        <Text style={{ color: '#9ca3af', marginTop: 12 }}>Carregando mesas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff1f2' }} edges={['top']}>

      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: '#f3f4f6',
            }}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937', flex: 1, marginLeft: 12 }}>Mesas</Text>
          <View style={{ backgroundColor: '#fce7f3', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99 }}>
            <Text style={{ color: '#f43f5e', fontSize: 13, fontWeight: '600' }}>
              {totalMesas} mesas
            </Text>
          </View>
        </View>
        <Text style={{ color: '#9ca3af', fontSize: 13 }}>
          {mesas.length} mesa{mesas.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Barra de busca */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: 'white', borderRadius: 14,
          paddingHorizontal: 14, paddingVertical: 12,
          shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
        }}>
          <Search size={18} color="#9ca3af" />
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar mesa..."
            placeholderTextColor="#9ca3af"
            style={{ flex: 1, marginLeft: 10, color: '#1f2937', fontSize: 15 }}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <X size={16} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lista de mesas */}
      <FlatList
        data={mesasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MesaCard 
            mesa={item} 
            onPressQR={abrirQRCode}
            onEdit={(mesa) => {
              setMesaEditando(mesa);
              setModalVisivel(true);
            }}
            onDelete={deletarMesa}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarDados(); }} tintColor="#f43f5e" />
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Users size={48} color="#fca5a5" />
            <Text style={{ color: '#9ca3af', marginTop: 16, textAlign: 'center' }}>
              {busca ? 'Nenhuma mesa encontrada.' : 'Nenhuma mesa ainda.\nAdicione a primeira!'}
            </Text>
          </View>
        }
      />

      {/* Botão flutuante */}
      {!modalVisivel && (
        <TouchableOpacity
          onPress={() => setModalVisivel(true)}
          style={{
            position: 'absolute', bottom: 32, right: 24,
            backgroundColor: '#f43f5e', borderRadius: 16,
            paddingHorizontal: 20, paddingVertical: 16,
            flexDirection: 'row', alignItems: 'center',
            shadowColor: '#f43f5e', shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
          }}
          activeOpacity={0.8}
        >
          <Plus size={20} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>Adicionar</Text>
        </TouchableOpacity>
      )}

      {/* Modal */}
      <ModalAdicionar
        visible={modalVisivel}
        mesas={mesas}
        loading={salvando}
        mesaEditando={mesaEditando}
        onClose={() => {
          setModalVisivel(false);
          setMesaEditando(null);
        }}
        onSave={adicionarMesa}
      />

    </SafeAreaView>
  );
}
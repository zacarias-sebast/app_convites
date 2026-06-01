// app/(tabs)/convidados.tsx

import { useAuth } from '@/hooks/useAuth';
import { Convidado, ConvidadoInsert, Mesa, supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import {
    ArrowLeft,
    CheckCircle,
    ChevronDown,
    Circle,
    Edit2,
    MapPin,
    Plus,
    QrCode,
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


type ConvidadoCardProps = {
  convidado: Convidado;
  onPressQR: (convidado: Convidado) => void;
  onEdit: (convidado: Convidado) => void;
  onDelete: (id: string) => void;
};

const ConvidadoCard = ({ convidado, onPressQR, onEdit, onDelete }: ConvidadoCardProps) => (
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

        {/* Nome + ícone de status */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          {convidado.status_checkin
            ? <CheckCircle size={18} color="#10b981" />
            : <Circle size={18} color="#d1d5db" />
          }
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', flex: 1 }} numberOfLines={1}>
            {convidado.nome}
          </Text>
        </View>

        {/* Mesa vinculada */}
        {convidado.mesas && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <MapPin size={12} color="#9ca3af" />
            <Text style={{ color: '#9ca3af', fontSize: 12 }}>
              Mesa {convidado.mesas.numero}
            </Text>
          </View>
        )}

        {/* Badge de status */}
        <View style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 99,
          backgroundColor: convidado.status_checkin ? '#d1fae5' : '#f3f4f6',
        }}>
          <Text style={{
            fontSize: 11,
            fontWeight: '600',
            color: convidado.status_checkin ? '#065f46' : '#6b7280',
          }}>
            {convidado.status_checkin ? 'Check-in feito ✓' : 'Aguardando'}
          </Text>
        </View>
      </View>

      {/* Botões de ações */}
      <View style={{ flexDirection: 'row', gap: 8, marginLeft: 12 }}>
        <TouchableOpacity
          onPress={() => onPressQR(convidado)}
          style={{
            backgroundColor: '#fff1f2',
            padding: 12,
            borderRadius: 12,
          }}
          activeOpacity={0.7}
        >
          <QrCode size={22} color="#f43f5e" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onEdit(convidado)}
          style={{
            backgroundColor: '#f3f4f6',
            padding: 12,
            borderRadius: 12,
          }}
          activeOpacity={0.7}
        >
          <Edit2 size={20} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(convidado.id)}
          style={{
            backgroundColor: '#fee2e2',
            padding: 12,
            borderRadius: 12,
          }}
          activeOpacity={0.7}
        >
          <Trash2 size={20} color="#f43f5e" />
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
  convidadoEditando?: Convidado | null;
  onClose: () => void;
  onSave: (dados: ConvidadoInsert, id?: string) => Promise<void>;
};

const ModalAdicionar = ({ visible, mesas, loading, convidadoEditando, onClose, onSave }: ModalAdicionarProps) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  useEffect(() => {
    if (convidadoEditando) {
      setNome(convidadoEditando.nome);
      setEmail(convidadoEditando.email || '');
      setTelefone(convidadoEditando.telefone || '');
      if (convidadoEditando.mesas) {
        setMesaSelecionada(convidadoEditando.mesas);
      }
    }
  }, [convidadoEditando]);

  const handleClose = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setMesaSelecionada(null);
    setMostrarDropdown(false);
    onClose();
  };

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome do convidado é obrigatório.');
      return;
    }
    await onSave({
      nome: nome.trim(),
      email: email.trim() || null,
      telefone: telefone.trim() || null,
      mesa_id: mesaSelecionada?.id || null,
    }, convidadoEditando?.id);
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>

          {/* Cabeçalho do modal */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
              {convidadoEditando ? 'Editar Convidado' : 'Novo Convidado'}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Nome */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Nome *</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Nome completo"
              placeholderTextColor="#9ca3af"
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            {/* Email */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            {/* Telefone */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Telefone</Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', color: '#1f2937', marginBottom: 16,
              }}
            />

            {/* Seletor de mesa */}
            <Text style={{ color: '#6b7280', fontSize: 13, fontWeight: '600', marginBottom: 4 }}>Mesa</Text>
            <TouchableOpacity
              onPress={() => setMostrarDropdown(!mostrarDropdown)}
              style={{
                borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
                paddingHorizontal: 16, paddingVertical: 12,
                backgroundColor: '#f9fafb', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between', marginBottom: 4,
              }}
            >
              <Text style={{ color: mesaSelecionada ? '#1f2937' : '#9ca3af' }}>
                {mesaSelecionada
                  ? `Mesa ${mesaSelecionada.numero} (cap. ${mesaSelecionada.capacidade})`
                  : 'Selecione uma mesa (opcional)'}
              </Text>
              <ChevronDown size={18} color="#9ca3af" />
            </TouchableOpacity>

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
                    style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                  >
                    <Text style={{ color: '#1f2937', fontWeight: '500' }}>
                      Mesa {mesa.numero}{mesa.descricao ? ` — ${mesa.descricao}` : ''}
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
                    {convidadoEditando ? 'Atualizar Convidado' : 'Adicionar Convidado'}
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
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [busca, setBusca] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [convidadoEditando, setConvidadoEditando] = useState<Convidado | null>(null);

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

      setConvidados(convidadosData || []);
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

  // Adiciona ou atualiza convidado no banco
  const adicionarConvidado = async (dados: ConvidadoInsert, id?: string) => {
    if (!user) return;
    setSalvando(true);
    try {
      if (id) {
        // Atualizar convidado existente
        const { error } = await supabase
          .from('convidados')
          .update(dados)
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        setConvidadoEditando(null);
      } else {
        // Inserir novo convidado
        const { error } = await supabase
          .from('convidados')
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

  // Deleta convidado do banco
  const deletarConvidado = (id: string) => {
    Alert.alert('Excluir convidado', 'Tem certeza que deseja excluir este convidado?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            const { error } = await supabase
              .from('convidados')
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
  const abrirQRCode = (convidado: Convidado) => {
    router.push({
      pathname: '/qrcode',
      params: {
        token: convidado.qr_code_token,
        nome: convidado.nome,
        mesa_numero: convidado.mesas?.numero?.toString() || 'Sem mesa',
        mesa_capacidade: convidado.mesas?.capacidade?.toString() || '0',
        mesa_descricao: convidado.mesas?.descricao || '',
      },
    });
  };

  const convidadosFiltrados = convidados.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalCheckin = convidados.filter((c) => c.status_checkin).length;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff1f2' }}>
        <ActivityIndicator size="large" color="#f43f5e" />
        <Text style={{ color: '#9ca3af', marginTop: 12 }}>Carregando convidados...</Text>
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
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937', flex: 1, marginLeft: 12 }}>Convidados</Text>
          <View style={{ backgroundColor: '#fce7f3', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99 }}>
            <Text style={{ color: '#f43f5e', fontSize: 13, fontWeight: '600' }}>
              {totalCheckin}/{convidados.length} check-ins
            </Text>
          </View>
        </View>
        <Text style={{ color: '#9ca3af', fontSize: 13 }}>
          {mesas.length} mesa{mesas.length !== 1 ? 's' : ''} configurada{mesas.length !== 1 ? 's' : ''}
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
            placeholder="Buscar convidado..."
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

      {/* Lista de convidados */}
      <FlatList
        data={convidadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConvidadoCard 
            convidado={item} 
            onPressQR={abrirQRCode}
            onEdit={(convidado) => {
              setConvidadoEditando(convidado);
              setModalVisivel(true);
            }}
            onDelete={deletarConvidado}
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
              {busca ? 'Nenhum convidado encontrado.' : 'Nenhum convidado ainda.\nAdicione o primeiro!'}
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
        convidadoEditando={convidadoEditando}
        onClose={() => {
          setModalVisivel(false);
          setConvidadoEditando(null);
        }}
        onSave={adicionarConvidado}
      />

    </SafeAreaView>
  );
}
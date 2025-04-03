import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const categories = [
  'Festa',
  'Conferência',
  'Esportivo',
  'Cultural',
  'Educativo',
  'Social'
];

type EventType = {
  name: string;
  date: string;
  category: string;
  description: string;
  location: string;
  imageUrl?: string;
};

export function FormEvents({ handleEvents, navigation }: { 
  handleEvents: (event: EventType) => void;
  navigation: any;
}) {
  const [event, setEvent] = useState<EventType>({
    name: '',
    date: '',
    category: categories[0],
    description: '',
    location: '',
    imageUrl: ''
  });

  const handleSubmit = () => {
    // Validação básica
    if (!event.name || !event.date || !event.location) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    handleEvents(event);
    Alert.alert('Sucesso', 'Evento criado com sucesso!');
    
    // Limpa o formulário após envio
    setEvent({
      name: '',
      date: '',
      category: categories[0],
      description: '',
      location: '',
      imageUrl: ''
    });
    
    // Opcional: navegar para a lista de eventos
    // navigation.navigate('ListadeEventos');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CRIAR EVENTO</Text>

      {/* Nome (Obrigatório) */}
      <Text style={styles.label}>Nome do Evento *</Text>
      <TextInput
        style={styles.input}
        value={event.name}
        onChangeText={(text) => setEvent({...event, name: text})}
        placeholder="Ex: Festa de Aniversário"
      />

      {/* Data (Obrigatório) */}
      <Text style={styles.label}>Data (DD/MM/AAAA) *</Text>
      <TextInput
        style={styles.input}
        value={event.date}
        onChangeText={(text) => setEvent({...event, date: text})}
        placeholder="Ex: 25/12/2025"
      />

      {/* Local (Obrigatório) */}
      <Text style={styles.label}>Local *</Text>
      <TextInput
        style={styles.input}
        value={event.location}
        onChangeText={(text) => setEvent({...event, location: text})}
        placeholder="Ex: Centro de Convenções"
      />

      {/* Descrição */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={event.description}
        onChangeText={(text) => setEvent({...event, description: text})}
        placeholder="Detalhes sobre o evento"
        multiline
      />

      {/* URL da Imagem (Opcional) */}
      <Text style={styles.label}>URL da Imagem (Opcional)</Text>
      <TextInput
        style={styles.input}
        value={event.imageUrl || ''}
        onChangeText={(text) => setEvent({...event, imageUrl: text})}
        placeholder="Ex: https://exemplo.com/imagem.jpg"
      />

      {/* Categoria */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={event.category}
          onValueChange={(itemValue) => setEvent({...event, category: itemValue})}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Criar Evento" 
          onPress={handleSubmit} 
          color="#6200ee"
        />
      </View>
      
      <Text style={styles.requiredText}>* Campos obrigatórios</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  requiredText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
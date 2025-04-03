import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importe do pacote correto

const categories = [
  'Festa',
  'Conferência',
  'Esportivo',
  'Cultural',
  'Educativo',
  'Social'
];

export function FormEvents({ handleEvents }: { handleEvents: (event: any) => void }) {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    category: categories[0]
  });

  const handleSubmit = () => {
    handleEvents(event);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CRIAR EVENTO</Text>

      {/* Nome */}
      <Text style={styles.label}>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        value={event.name}
        onChangeText={(text) => setEvent({...event, name: text})}
        placeholder="Ex: Festa de Aniversário"
      />

      {/* Data */}
      <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
      <TextInput
        style={styles.input}
        value={event.date}
        onChangeText={(text) => setEvent({...event, date: text})}
        placeholder="Ex: 25/12/2025"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
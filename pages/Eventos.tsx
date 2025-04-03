import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Definindo o tipo do evento
type EventType = {
  name: string;
  date: string;
  category: string;
};

// Componente principal - CORRIGIDO
export function EventList({ route }: { route: { params: { events: EventType[] } } }) {
  const { events } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventText}>Data: {item.date}</Text>
            <Text style={styles.eventText}>Categoria: {item.category}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento cadastrado ainda.</Text>
        }
      />
    </View>
  );
}

// Estilos - CORRIGIDOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});
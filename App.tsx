import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { PaginaInicial } from './pages/PaginaInicial';
import { TeladeLogin } from './pages/TeladeLogin';
import { FormEvents } from './pages/Formulario';
import { EventList } from './pages/Eventos';

// Definindo os tipos de navegação
type RootStackParamList = {
  PaginaInicial: undefined;
  TeladeLogin: undefined;
  Formulario: undefined;
  ListadeEventos: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Tipo do Evento (mantendo consistência com o formulário)
type EventType = {
  name: string;
  date: string;
  category: string;
  description: string;
  location: string;
  imageUrl?: string;
};

export default function App() {
  const [listEvents, setListEvents] = useState<EventType[]>([]);

  const handleEvents = (newEvent: EventType) => {
    const updatedEvents = [...listEvents, newEvent];
    setListEvents(updatedEvents);
    console.log('Evento adicionado:', newEvent);
    
    // Opcional: Adicione aqui qualquer lógica pós-criação do evento
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="PaginaInicial"
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: true // Habilita gestos de navegação
        }}
      >
        {/* Tela Splash/Inicial */}
        <Stack.Screen 
          name="PaginaInicial" 
          component={PaginaInicial} 
        />
        
        {/* Tela de Login */}
        <Stack.Screen 
          name="TeladeLogin" 
          component={TeladeLogin} 
        />
        
        {/* Tela de Formulário */}
        <Stack.Screen name="Formulario">
          {(props) => (
            <FormEvents 
              {...props} 
              handleEvents={handleEvents}
              navigation={props.navigation} // Passando a navegação para o formulário
            />
          )}
        </Stack.Screen>
        
        {/* Tela de Listagem de Eventos */}
        <Stack.Screen 
          name="ListadeEventos" 
          options={{ 
            headerShown: true, // Mostra header apenas nesta tela
            title: 'Meus Eventos',
            headerBackTitle: 'Voltar'
          }}
        >
          {(props) => <EventList {...props} events={listEvents} />}
        </Stack.Screen>
      </Stack.Navigator>
      
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
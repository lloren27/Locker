import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SneakersList from './src/views/Locker/SneakersList';
import SneakerDetail from './src/views/Locker/SneakerDetail';
import AddSneaker from './src/views/AddSneaker';

const Tab = createBottomTabNavigator();
const SneakerStack = createStackNavigator();

function SneakerStackScreen() {
  return (
    <SneakerStack.Navigator>
      <SneakerStack.Screen
        name="SneakersList"
        component={SneakersList}
        options={{title: 'Inicio'}}
      />
      <SneakerStack.Screen name="SneakerDetail" component={SneakerDetail} />
    </SneakerStack.Navigator>
  );
}

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Listado de zapatillas" component={SneakerStackScreen} />
      <Tab.Screen name="Añade tus nuevas zapatillas" component={AddSneaker} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;

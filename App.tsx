import React from 'react';
import Home from './src/index';

import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './src/navigator/snack-config';
import { NavigationContainer } from '@react-navigation/native';
import DetailsImage from './src/screen/DetaisImage';


const Root = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home">
        <Root.Screen name="Home" component={Home} />
        <Root.Screen 
          name="DetaisImage" 
          component={DetailsImage} 
          options={{
            title: 'Detalhes da Imagem',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}  
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}
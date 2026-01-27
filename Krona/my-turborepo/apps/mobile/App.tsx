import { NavigationContainer } from "@react-navigation/native"
import React from 'react';
import TabNavigator from './src/navigation/tabNavigation/TavNavigator';


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigator /> 
    </NavigationContainer>
  );
}
export default App;

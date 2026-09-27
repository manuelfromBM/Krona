import { AuthProvider } from "@packages/hooks";
import React from 'react';
import RootNavigator from "src/navigation/rootNavigation/RootNavigator";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
  )
};

export default App;

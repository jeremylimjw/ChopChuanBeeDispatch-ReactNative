import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { AppProvider } from './providers/AppProvider';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFF',
    accent: '#ff4081',
    background: "#DCDCDC"
  },
};

export default function Main() {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <App />
        <StatusBar style="dark" />
      </PaperProvider>
    </AppProvider>
  )
}

registerRootComponent(Main);
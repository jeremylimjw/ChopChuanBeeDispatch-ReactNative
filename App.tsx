import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import { useState } from 'react';

export default function App() {
  const [markers, setMarkers] = useState<any[]>([]);
  const [polylineCoords, setPolylineCoords] = useState<number[][]>([]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" style='light' />
      <Topbar setMarkers={setMarkers} setPolylineCoords={setPolylineCoords} />
      <Map markers={markers} polylineCoords={polylineCoords} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

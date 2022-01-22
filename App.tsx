
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AppProvider, useApp } from './providers/AppProvider';
import MyStack from './MyStack';


export default function App() {
  return (
    <AppProvider>
      <MyStack />
    </AppProvider>
  );
}
// <View style={styles.container}>
// <StatusBar backgroundColor="black" style='light' />
// <Topbar setMarkers={setMarkers} setPolylineCoords={setPolylineCoords} />
// <Map markers={markers} polylineCoords={polylineCoords} />
// <Footer />
// </View>

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

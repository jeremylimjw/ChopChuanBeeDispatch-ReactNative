import MapView, { Marker, Polyline } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useApp } from '../providers/AppProvider';
import { LocationAccuracy } from 'expo-location';

export default function Map({ markers, polylineCoords }: any) {
  const { currentPosition } = useApp();

    let mapView: MapView | null;

    async function mapReady() {
      let location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.High });
      let region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
      };

      mapView?.animateToRegion(region, 1000);
    }

    return (
        <>
          <MapView 
              ref={ref => { if (ref != null) mapView = ref }}
              style={styles.map}
              initialRegion={{
                  latitude: 1.3559744755561935,
                  longitude: 103.81716048029581,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
              }}
              onMapReady={mapReady}
          >
              
            {markers.map((marker: any, index: number) => (
                <Marker
                    key={index}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description}
                />
            ))}


            {currentPosition != null && 
                <Marker coordinate={currentPosition}>
                    <View style={styles.circle} />
                </Marker>
            }

            { polylineCoords.length !== 0 && 
              <Polyline
                coordinates={polylineCoords}
                strokeColor="#6495ED" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
              />
            } 

          </MapView>
        </>
    )

}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: "#1E90FF",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1
  },
  input: {
    borderColor: "gray",
    width: 500,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
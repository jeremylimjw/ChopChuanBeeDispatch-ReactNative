import MapView, { Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useApp } from '../providers/AppProvider';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = '<INSERT API KEY HERE>';


export default function Map({ markers, directions }: any) {
  const { currentPosition } = useApp();

  let mapView: MapView | null;

  function panCameraTo(latitude: number, longitude: number) {
    let region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    mapView?.animateToRegion(region, 1000);
  }

  return (
      <>
        { currentPosition != null &&
          <MapView 
              ref={ref => { if (ref != null) mapView = ref }}
              style={styles.map}
              initialRegion={{
                  // latitude: 1.3559744755561935,
                  // longitude: 103.81716048029581,
                  latitude: currentPosition.latitude,
                  longitude: currentPosition.longitude,
                  latitudeDelta: 0.025,
                  longitudeDelta: 0.025,
              }}
          >
              
            { markers.map((marker: any, index: number) =>
              <Marker key={index}
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
              />
            )}


            {currentPosition != null && 
              <Marker coordinate={currentPosition}>
                <View style={styles.circle} />
              </Marker>
            }

            {directions && 
              <MapViewDirections
                origin={directions.origin}
                destination={directions.destination}
                waypoints={directions.waypoints}
                strokeColor="#6495ED"
                strokeWidth={6}
                apikey={GOOGLE_MAPS_APIKEY}
              />
            }

          </MapView>
        }
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

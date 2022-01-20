import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getGeocode, mapToCoords, testFunction } from "../api";
  
const styles = StyleSheet.create({
  container: {
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: '100%', 
      padding: 20,
      paddingTop: 35,
      zIndex: 1,
      backgroundColor: '#fff',
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default function Topbar({ setMarkers, setPolylineCoords }: any) {

    const [destinationText, setDestinationText] = useState<string>("");
    const [error, setError] = useState<string>("");

    function submit() {
      if (destinationText === "") {
        return;
      }

      getGeocode(destinationText)
        .then((res: any) => {
          if (res.results.length === 0) {
            setError("No results found.");
            return;
          }
          
          setError("");
  
          const markers = [
              {
                  coordinates: { latitude: parseFloat(res.results[0].LATITUDE), longitude: parseFloat(res.results[0].LONGITUDE) },
                  title: res.results[0].BUILDING,
                  description: res.results[0].ROAD_NAME + ", " + res.results[0].POSTAL
              }
          ]
          setMarkers(markers);
        })
        .catch(err => {
          // console.log(err);
        })

      setPolylineCoords(testFunction());
    }


    return (
      <View style={styles.container}>
          <Text>Topbar</Text>
          <TextInput style={styles.input} onChangeText={setDestinationText} placeholder="Destination" />
          <Button onPress={submit} title="Find directions" color="#841584"/>
          {error !== "" && <Text>{error}</Text>}
      </View>
    );
  }
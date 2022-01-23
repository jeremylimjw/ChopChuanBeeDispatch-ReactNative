import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './Map';

export default function SingleRoute() {
    return (
        <>
            <Map markers={[]} polylineCoords={[]} />
            <View style={styles.footer}>
                <Text>Swipe bar</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  footer: {
      position: "absolute", 
      bottom: 0, 
      left: 0,
      backgroundColor: "#FFF",
      width: "100%",
      padding: 5,
  }
})

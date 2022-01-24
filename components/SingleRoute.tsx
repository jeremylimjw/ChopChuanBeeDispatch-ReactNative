import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './Map';
import Slider from 'react-native-slide-to-unlock';
import { Avatar, Subheading } from 'react-native-paper';

export default function SingleRoute({ route, navigation }: any) {

    const destination: any = {
        coordinates: { latitude: route.params.order.latitude, longitude: route.params.order.longitude },
        title: route.params.order.company,
        description: route.params.order.address,
    }

    function handleSwipeGesture() {
    }

    return (
        <>
            <Map markers={[destination]} polylineCoords={[]} />
            <View style={styles.footer}>
                <Slider containerStyle={styles.swipeContainer}
                    onEndReached={handleSwipeGesture}
                    sliderElement={<Avatar.Icon size={68} icon="chevron-right"  />}>
                    <Subheading>{'COMPLETED'}</Subheading>
                </Slider>
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
        padding: 2,
    },
    swipeContainer:  {
        margin: 8,
        backgroundColor: '#c3c3c3',
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        padding: 3,
    },
})

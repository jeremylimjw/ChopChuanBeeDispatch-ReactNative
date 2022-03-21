import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './Map';
import Slider from 'react-native-slide-to-unlock';
import { Avatar, Caption, FAB, Paragraph } from 'react-native-paper';
import { DeliveryOrder } from '../models/DeliveryOrder';
import { useApp } from '../providers/AppProvider';
import { DeliveryStatus } from '../enums/DeliveryStatus';
import { redirectToMaps } from '../utilities/externalLink';


export default function SingleRoute({ route, navigation }: any) {
    const { completeOrder, confirmCancelOrder, currentPosition } = useApp();
    
    const order: DeliveryOrder = route.params.order;

    const destination: any = {
        coordinates: { latitude: +order.latitude, longitude: +order.longitude },
        title: order.sales_order?.customer.company_name || 'Custom Order',
        description: order.address,
    }

    function handleSwipeGesture() {
        completeOrder(order)
            .then(() => {
                navigation.goBack(); // TODO: get itienrary, find, open next delivery
            })
            .catch(console.log);
    }

    function handleCancelOrder(order: DeliveryOrder): void {
        confirmCancelOrder(order, (event: string, err: any, success: any) => {
            if (event === 'OK') {
                navigation.goBack();
            }
        })
      }

    return (
        <>
            { order.remarks && 
                <View style={styles.header}>
                    <Caption style={styles.caption}>{order.remarks}</Caption>
                </View>
            }
            <Map 
                markers={[destination]} 
                directions={{
                    origin: { longitude: +currentPosition?.longitude, latitude: +currentPosition?.latitude },
                    destination: { longitude: +order?.longitude, latitude: +order?.latitude },
                    waypoints: []
                }}
            />

            <View style={styles.footer}>
                
                <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                    { order.delivery_status_id !== DeliveryStatus.COMPLETED.id  && 
                        <FAB style={styles.fab} icon="close" onPress={() => handleCancelOrder(order)} />
                    }
                    <FAB style={styles.fab} icon="map-marker-radius" onPress={() => redirectToMaps(order)}/>
                    <FAB style={styles.fab} icon="file-document-outline" onPress={() => navigation.navigate('orderDetails', { order: order })} />
                </View>
                
                <View style={styles.swipeContainer}>
                    { order.delivery_status_id !== DeliveryStatus.COMPLETED.id && 
                        <Slider containerStyle={styles.slider}
                            onEndReached={handleSwipeGesture}
                            sliderElement={<Avatar.Icon size={68} icon="chevron-right"  />}>
                            <Paragraph>COMPLETED</Paragraph>
                        </Slider>
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#FFF",
        width: "100%",
        padding: 10,
    },
    caption: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
    },
    footer: {
        position: "absolute", 
        width: "100%",
        bottom: 0, 
        left: 0,
    },
    swipeContainer:  {
        backgroundColor: "#FFF",
        width: "100%",
        padding: 2,
    },
    slider:  {
        margin: 8,
        backgroundColor: '#c3c3c3',
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        padding: 3,
    },
    fab: {
        backgroundColor: "#FFF",
        width: 55,
        marginBottom: 25,
        marginRight: 20,
    },
})

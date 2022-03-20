import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './Map';
import Slider from 'react-native-slide-to-unlock';
import { Avatar, Caption, Paragraph } from 'react-native-paper';
import { DeliveryOrder } from '../models/DeliveryOrder';
import { useApp } from '../providers/AppProvider';
import { DeliveryStatus } from '../enums/DeliveryStatus';
import { httpCompleteOrder } from '../api/delivery';


export default function SingleRoute({ route, navigation }: any) {
    const { updateDeliveryOrder, currentPosition, handleHttpError } = useApp();
    
    const order: DeliveryOrder = route.params.order;

    const destination: any = {
        coordinates: { latitude: +order.latitude, longitude: +order.longitude },
        title: order.sales_order?.customer.company_name || 'Custom Order',
        description: order.address,
    }

    function handleSwipeGesture() {
        httpCompleteOrder(order.id)
            .then(() => {
                updateDeliveryOrder({...order, delivery_status_id: DeliveryStatus.COMPLETED.id });
                navigation.goBack();
            })
            .catch(handleHttpError);
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
                { order.delivery_status_id !== DeliveryStatus.COMPLETED.id && 
                    <Slider containerStyle={styles.swipeContainer}
                        onEndReached={handleSwipeGesture}
                        sliderElement={<Avatar.Icon size={68} icon="chevron-right"  />}>
                        <Paragraph>COMPLETED</Paragraph>
                    </Slider>
                }
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

import { Dimensions, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, BottomNavigation, Button, Card, IconButton, Menu } from "react-native-paper";
import { useState } from "react";
import { DeliveryOrder } from "../models/DeliveryOrder";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Map from "./Map";
import { useApp } from "../providers/AppProvider";
import { DeliveryStatus } from "../enums/DeliveryStatus";


export default function RouteOverview({ route, navigation }: any) {
  const { itinerary } = route.params;

  const [index, setIndex] = useState(1);
  const routes = [
    { key: 'mapOverview', title: 'Map Overview', icon: 'map-marker-distance' },
    { key: 'viewList', title: 'View List', icon: 'format-list-bulleted' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    mapOverview: () => <MapOverview itinerary={itinerary} navigation={navigation} />,
    viewList: () => <RouteList itinerary={itinerary} navigation={navigation} />,
  });

  return (
    <>
      <BottomNavigation navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}

function MapOverview({ itinerary, navigation }: any) {

  return (
    <>
      { (itinerary && itinerary.delivery_orders.length != null) &&
        <Map 
          markers={itinerary?.delivery_orders?.map((order: DeliveryOrder) => ({
            coordinates: { longitude: +order.longitude, latitude: +order.latitude },
            title: order.sales_order?.customer.company_name || 'Custom Order',
            description: order.address
          }))} 
          directions={{
            origin: { longitude: +itinerary?.longitude, latitude: +itinerary?.latitude },
            destination: { longitude: +itinerary?.longitude, latitude: +itinerary?.latitude },
            waypoints: itinerary?.delivery_orders.map((x: DeliveryOrder) => ({ longitude: +x.longitude, latitude: +x.latitude }))
          }} 
        />
      }
    </>
  )
}

function RouteList({ itinerary, navigation }: any) {
  const { removeDeliveryOrder } = useApp();

  function renderMenu(order: DeliveryOrder) {
    const [visible, setVisible] = useState(false);

    function openInMaps(order: DeliveryOrder): void {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${order.latitude},${order.longitude}`;
      const label = '';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      setVisible(false);
  
      Linking.openURL(url!);
    }

    function unassignOrder(order: DeliveryOrder): void {
      // send HTTP request here
      removeDeliveryOrder(order);
      setVisible(false);
    }

    function onPress() {
      if (order.delivery_status_id === DeliveryStatus.COMPLETED.id) {
        return;
      }
      setVisible(true);
    }

    return (
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Appbar.Action icon="dots-vertical" onPress={onPress}/>
        }>
        <Menu.Item onPress={() => unassignOrder(order)} title="Unassign" />
        <Menu.Item onPress={() => openInMaps(order)} title="Open in Maps" />
      </Menu>
    )
  }

  return (
    <>
      <ScrollView>
        { itinerary?.delivery_orders?.map((order: DeliveryOrder, index: number) => 
          <Card key={index} style={styles.listItem} onPress={() => navigation.navigate('singleRoute', { order: order })}>
            <Card.Title 
              style={{ opacity: order.delivery_status_id == DeliveryStatus.COMPLETED.id ? 0.3 : 1 }}
              title={order.sales_order?.customer.company_name || 'Custom Order'} 
              subtitle={order.address} 
              left={() => 
                <MaterialCommunityIcons name="subdirectory-arrow-right" size={34} color="#24307b" />
              } 
              right={() => renderMenu(order)}
            />
          </Card>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  listItem: {
    marginTop: 8, 
    marginLeft: 8, 
    marginRight: 8,
  }
})
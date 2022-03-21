import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Appbar, BottomNavigation, Card, Menu } from "react-native-paper";
import { useState } from "react";
import { DeliveryOrder } from "../models/DeliveryOrder";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Map from "./Map";
import { useApp } from "../providers/AppProvider";
import { DeliveryStatus } from "../enums/DeliveryStatus";
import { redirectToMaps } from "../utilities/externalLink";


export default function RouteOverview({ route, navigation }: any) {
  const { itinerary } = route.params;

  const [index, setIndex] = useState(1);
  const routes = [
    { key: 'mapOverview', title: 'Map Overview', icon: 'map-marker-distance' },
    { key: 'viewList', title: 'View List', icon: 'format-list-bulleted' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    mapOverview: () => <MapOverview itinerary={itinerary} />,
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

function MapOverview({ itinerary }: any) {

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
  const { confirmCompleteOrder, confirmCancelOrder } = useApp();

  function renderMenu(order: DeliveryOrder) {
    const [visible, setVisible] = useState(false);

    function openInMaps(order: DeliveryOrder): void {
      setVisible(false);
      redirectToMaps(order);
    }

    function viewOrderDetails(order: DeliveryOrder): void {
      navigation.navigate('orderDetails', { order: order });
      setVisible(false);
    }

    function handleCompleteOrder(order: DeliveryOrder): void {
      setVisible(false);
      confirmCompleteOrder(order, (event: string, err: any, success: any) => { })
    }

    function handleCancelOrder(order: DeliveryOrder): void {
      setVisible(false);
      confirmCancelOrder(order, (event: string, err: any, success: any) => { })
    }

    return (
      <Menu visible={visible} onDismiss={() => setVisible(false)} anchor={<Appbar.Action icon="dots-vertical" onPress={() => setVisible(true)}/>}>
        <Menu.Item icon="map-marker-radius" onPress={() => openInMaps(order)} title="Open in Maps" />
        <Menu.Item icon="file-document-outline" onPress={() => viewOrderDetails(order)} title="View Details" />
        <Menu.Item icon="check" onPress={() => handleCompleteOrder(order)} title="Mark as Complete" disabled={order.delivery_status_id === DeliveryStatus.COMPLETED.id} />
        <Menu.Item icon="close" onPress={() => handleCancelOrder(order)} title="Mark as Fail" disabled={order.delivery_status_id === DeliveryStatus.COMPLETED.id} />
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
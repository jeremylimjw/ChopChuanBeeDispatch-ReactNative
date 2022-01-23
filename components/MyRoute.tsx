import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BottomNavigation, Card } from "react-native-paper";
import { useApp } from "../providers/AppProvider";
import { useState } from "react";
import { Order } from "../models/Order";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Map from "./Map";


export default function MyRoute({ navigation }: any) {
    const { user, orders } = useApp();

    const [index, setIndex] = useState(0);
    const routes = [
      { key: 'mapOverview', title: 'Map Overview', icon: 'map-marker-distance' },
      { key: 'viewList', title: 'View List', icon: 'format-list-bulleted' },
    ];

    const renderScene = BottomNavigation.SceneMap({
      mapOverview: RouteOverview,
      viewList: () => RouteList(navigation),
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

function RouteOverview() {
  return (
    <>
      <Map markers={[]} polylineCoords={[]} />
    </>
  )
}

function RouteList(navigation : any) {
  const { optimizedOrders } = useApp();

  return (
    <>
      { optimizedOrders.map((order: Order, index: number) => 
        <Card key={index} style={styles.listItem} onPress={() => navigation.navigate('singleRoute')}>
          <Card.Title title={order.company} subtitle={order.address} 
            left={() => 
              <MaterialCommunityIcons name="subdirectory-arrow-right" size={34} color="#24307b" />
            } />
        </Card>
      )}
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
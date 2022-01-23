import { ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native";
import { useApp } from "../providers/AppProvider";
import { Button, Card, Checkbox, TouchableRipple } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Order } from "../models/Order";
import { useCallback, useEffect, useState } from "react";
import { orders as tempStore } from "../store";
import { User } from "../models/User";


export default function Home({ navigation }: any) {
  const { user, orders, setOrders, setOptimizedOrders, logout  } = useApp();

  const [refreshing, setRefreshing] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  useEffect(() => {
    setRefreshing(true);
    try {
      retrieveAllOrders(user).then(orders => {
        setOrders(orders)
        setRefreshing(false);
      })
    } catch(e) { } // Setting state after user navigates away triggers an error
  }, []);

  useEffect(() => {
    // Keep track of "Select All" or "Unselect All" everytime a checkbox is toggled
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].checked == false) {
        setCheckAll(true);
        return;
      }
    }
    setCheckAll(false);
  }, [orders]);

  // Handle user scrolling up to refresh page
  const handleSwipeRefreshEvent = useCallback(() => {
    setRefreshing(true);
    retrieveAllOrders(user).then(orders => {
      setOrders(orders)
      setRefreshing(false);
    })
  }, []);

  // Retrieve orders from backend
  function retrieveAllOrders(user: User): Promise<Order[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(tempStore.map(x => Object.assign(x, { checked: true })));
        }, 2000);
    });
  }

  // Handle individual checkbox toggle event
  function handleCheckBoxPressEvent(o: Order, checked: boolean): void {
    const temp: any = [...orders];
    const order = temp.find((x: any) => x.id === o.id);
    order.checked = checked;
    setOrders(temp);
  }

  // Handle "Select All" button press event
  function handleSelectAllPressEvent(): void {
    if (checkAll) {
      setOrders(orders.map((x: Order) => Object.assign(x, { checked: true })))
    } else {
      setOrders(orders.map((x: Order) => Object.assign(x, { checked: false })))
    }
  }

  // Handle "Optimize" button press event
  function handleOptimizePressEvent(): void {
    const selectedOrders = orders.filter((order: Order) => order.checked);

    // traveling salesman algo here

    setOptimizedOrders(selectedOrders)

    navigation.navigate('myRoute');
  }

  return (
    <>
      { orders.length !== 0 && 
        <Button labelStyle={{ color: 'black' }} mode="outlined" style={styles.listItem} onPress={handleSelectAllPressEvent}>
          {checkAll ? "Select All" : "Unselect All" }
        </Button>
      }

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleSwipeRefreshEvent} />}>

        { orders.map((order: Order, i: number)=> 
          <Card key={i} style={styles.listItem} onPress={() => handleCheckBoxPressEvent(order, !order.checked)}>
            <Card.Title title={order.company} subtitle={order.address} 
              left={() => <Checkbox status={order.checked ? 'checked' : 'unchecked'} />} 
            />
          </Card>
        )}

      </ScrollView>

      <View style={styles.bottomBar}>

        <Button color="#3f51b5" labelStyle={{ color: 'white' }} mode="contained" 
          onPress={handleOptimizePressEvent} disabled={orders.filter((order: Order) => order.checked).length === 0}>
          <MaterialCommunityIcons name="sync" size={28} />
          <Text style={{ fontSize: 24 }}> Optimize</Text>
        </Button>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 8, 
    marginLeft: 8, 
    marginRight: 8,
  },
  bottomBar: {
    height: 60, 
    paddingTop: 5, 
    margin: 10,
  }
});
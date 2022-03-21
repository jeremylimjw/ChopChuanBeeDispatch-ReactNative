import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useApp } from "../providers/AppProvider";
import { Card } from 'react-native-paper';
import { useCallback, useEffect, useState } from "react";
import { httpGetItinerarys } from "../api/delivery";
import { Itinerary } from "../models/Itinerary";
import { parseDateTime, parseDateTimeSeconds } from "../utilities/datetime";
import { DeliveryStatus } from "../enums/DeliveryStatus";


export default function Home({ navigation }: any) {
  const { user, handleHttpError, itinerarys, setItinerarys } = useApp();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Retrieve orders from backend
  const retrieveAllOrders = useCallback(
    async (): Promise<any> => {
      if (user) {
        setRefreshing(true);
        httpGetItinerarys(user.id)
          .then(itinerarys => {
            setItinerarys(itinerarys);
            setRefreshing(false);
          })
          .catch(handleHttpError)
          .catch(err => {
            setRefreshing(false)
          })
      }
    },
    [setItinerarys, setRefreshing, user],
  );

  useEffect(() => {
    retrieveAllOrders();
  }, [retrieveAllOrders]);

  function isCompleted(itinerary: Itinerary): boolean {
    for (let delivery_order of itinerary.delivery_orders) {
        if (delivery_order.delivery_status_id !== DeliveryStatus.COMPLETED.id) {
          return false;
        }
    }
    return true;
  }

  return (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={retrieveAllOrders} />}>
        { itinerarys.map((itinerary: Itinerary, i: number)=> 
          <Card key={i} style={styles.listItem} onPress={() => navigation.navigate('routeOverview', { itinerary: itinerary })}>
            <Card.Title 
              style={{ opacity: isCompleted(itinerary) ? 0.3 : 1 }}
              title={parseDateTime(itinerary.start_time)} 
              subtitle={"Created at: " + parseDateTimeSeconds(itinerary.created_at)} 
            />
          </Card>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 8, 
    marginLeft: 8, 
    marginRight: 8,
  },
  optimizeButton: {
    height: "100%", 
    padding: 8,
  }
});
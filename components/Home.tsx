import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useApp } from "../providers/AppProvider";
import { Card } from 'react-native-paper';
import { useCallback, useEffect, useState } from "react";
import { httpGetItinerarys } from "../api/delivery";
import { Itinerary } from "../models/Itinerary";
import { parseDateTime, parseDateTimeSeconds } from "../utilities/datetime";


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

  return (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={retrieveAllOrders} />}>
        { itinerarys.map((itinerary: Itinerary, i: number)=> 
          <Card key={i} style={styles.listItem} onPress={() => navigation.navigate('routeOverview', { itinerary: itinerary })}>
            <Card.Title title={parseDateTime(itinerary.start_time)} subtitle={"Created at: " + parseDateTimeSeconds(itinerary.created_at)} />
          </Card>
        )}

      </ScrollView>

      {/* <View style={styles.bottomBar}>
        <Button color="#3f51b5" style={styles.optimizeButton} labelStyle={{ color: 'white' }} mode="contained" loading={optimizing} icon="sync"
          onPress={handleOptimizePressEvent} disabled={orders.filter((order: DeliveryOrder) => order.checked).length === 0 || optimizing}>
          Optimize Route
        </Button>
      </View> */}
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
  },
  optimizeButton: {
    height: "100%", 
    padding: 8,
  }
});
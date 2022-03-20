
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useApp } from './providers/AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './components/Login';
import History from './components/History';
import RouteOverview from './components/RouteOverview';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import SingleRoute from './components/SingleRoute';
import Profile from './components/Profile';


export default function App() {
  const { user } = useApp();
  const Stack = createStackNavigator();

  const screens = [
    {
      name: "home",
      component: Home,
      options: { 
        headerTitle: "My Itineraries",
        header: (props: any) => {
          return <NavigationBar {...props} />
        }
      },
    }, 
    {
      name: "routeOverview",
      component: RouteOverview,
      options: { 
        headerTitle: "Itinerary Overview",
        header: (props: any) => {
          return <NavigationBar {...props} />
        },
        ...TransitionPresets.SlideFromRightIOS
      },
    }, 
    {
      name: "singleRoute",
      component: SingleRoute,
      options: ({ route }: any) => ({ 
        headerTitle: route.params.order.sales_order?.customer.company_name || 'Custom Order',
        header: (props: any) => {
          return <NavigationBar {...props} />
        },
        ...TransitionPresets.SlideFromRightIOS 
      }),
    },
    {
      name: "history",
      component: History,
      options: { 
        headerTitle: "History",
        hideProfile: true,
        header: (props: any) => {
          return <NavigationBar {...props} />
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
    }, 
    {
      name: "profile",
      component: Profile,
      options: { 
        headerTitle: "Profile",
        hideProfile: true,
        header: (props: any) => {
          return <NavigationBar {...props} />
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
    }
  ]

  return (
    <>
      { user == null ?
        <Login />
        :
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {screens.map((screen, index: number) => 
              <Stack.Screen key={index} name={screen.name} component={screen.component}
                options={screen.options}/>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
}
// <View style={styles.container}>
// <StatusBar backgroundColor="black" style='light' />
// <Topbar setMarkers={setMarkers} setPolylineCoords={setPolylineCoords} />
// <Map markers={markers} polylineCoords={polylineCoords} />
// <Footer />
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

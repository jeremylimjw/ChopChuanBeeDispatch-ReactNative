
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useApp } from './providers/AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './components/Login';
import OrderDetails from './components/OrderDetails';
import RouteOverview from './components/RouteOverview';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import SingleRoute from './components/SingleRoute';
import Profile from './components/Profile';
import Signature from './components/Signature';


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
      name: "orderDetails",
      component: OrderDetails,
      options: { 
        headerTitle: "View Order Details",
        hideProfile: true,
        header: (props: any) => {
          return <NavigationBar {...props} />
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
    }, 
    {
      name: "signature",
      component: Signature,
      options: { 
        headerTitle: "Complete Delivery",
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

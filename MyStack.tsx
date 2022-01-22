import Login from "./components/Login";
import { useApp } from "./providers/AppProvider";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from "./components/Home";
import History from "./components/History";
import MyRoute from "./components/MyRoute";


export default function MyStack() {
    const { user } = useApp();
    const Stack = createStackNavigator();

    return (
        <>
        { user == null ?
            <Login />
            :
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="MyRoute" component={MyRoute}
                    options={{
                        title: 'My Route',
                        ...TransitionPresets.SlideFromRightIOS,
                    }}/>
                    <Stack.Screen name="History" component={History}
                    options={{
                        title: 'History',
                        ...TransitionPresets.ModalSlideFromBottomIOS,
                    }}/>
                    
                </Stack.Navigator>
            </NavigationContainer>
        }
        </>
    );

};
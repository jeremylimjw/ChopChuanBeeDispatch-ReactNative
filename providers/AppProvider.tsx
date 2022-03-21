
import { useState, useEffect, useContext, createContext  } from "react";
import * as Location from 'expo-location';
import { User } from "../models/User";
import { LatLng } from "react-native-maps";
import { LocationAccuracy } from "expo-location";
import { httpLogin, httpLogout } from "../api/auth";
import { Itinerary } from "../models/Itinerary";
import { DeliveryOrder } from "../models/DeliveryOrder";
import { Alert } from "react-native";
import { httpCompleteOrder, httpRecordOrderSignature, httpUnassignOrder } from "../api/delivery";
import { DeliveryStatus } from "../enums/DeliveryStatus";

const AppContext = createContext<any>(null);

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);
    const [itinerarys, setItinerarys] = useState<Itinerary[]>([]);

    useEffect(() => {
        // Setup location service
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({ accuracy: LocationAccuracy.High }, location => {
                let currentPosition = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
                setCurrentPosition(currentPosition);
            })
        })();
    }, []);

    // Log in user and save into session
    async function login(username: string, password: string): Promise<any> {
        return httpLogin(username, password)
            .then(user => {
                setUser(user);
            })
    }

    /**
     * Remove the logged in user's session
     */
    function removeSession() {
        setUser(null);
    }

    /**
     * Requests backend to remove user's token, and then clear session in the browser
     */
    function logout() {
        httpLogout().finally(() => {
            removeSession();
        })
    }
    
    /**
     * Wrapper to handle HTTP errors
     */
    function handleHttpError(error: any): void {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                removeSession();
                // message.error(error.response.data);
                throw Error(error.response.data);
            } else if (error.response.status === 333) {
                removeSession();
                // message.error('Login session timed out. Please login again.');
                throw Error('Login session timed out. Please login again.');
            } else {
                console.log(error.response.data)
                if (typeof error.response.data === 'string') {
                    throw Error(error.response.data);
                } else {
                    throw Error(JSON.stringify(error.response.data));
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // message.error('The request was made but no response was received.')
            console.error(error)
            throw Error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            // message.error('Something happened in setting up the request that triggered an Error.')
            console.error(error)
            throw error;
        }
    }
    
    // Update a delivery order model from itinerary store
    function updateDeliveryOrder(newDeliveryOrder: DeliveryOrder): void {
        const newItinerarys = [...itinerarys];
        const index = newItinerarys.findIndex((x: Itinerary) => x.id === newDeliveryOrder.itinerary_id);
        if (index < 0) return;
        const indexDO = newItinerarys[index].delivery_orders.findIndex((x: DeliveryOrder) => x.id === newDeliveryOrder.id);
        if (indexDO < 0) return;
        newItinerarys[index].delivery_orders[indexDO] = {...newItinerarys[index].delivery_orders[indexDO], ...newDeliveryOrder};

        setItinerarys(newItinerarys);
    }

    // Remove a delivery order from itinerary store
    function removeDeliveryOrder(deliveryOrder: DeliveryOrder): void {
        const newItinerarys = [...itinerarys];
        const index = newItinerarys.findIndex((x: Itinerary) => x.id === deliveryOrder.itinerary_id);
        if (index < 0) return;
        const newDeliveryOrders = newItinerarys[index].delivery_orders.filter(x => x.id !== deliveryOrder.id);
        newItinerarys[index].delivery_orders = [...newDeliveryOrders];

        setItinerarys(newItinerarys);
    }


    // Complete order with confirmation
    function confirmCompleteOrder(order: DeliveryOrder, myCallback: (event: string, err?: any, success?: any) => void): void {
        Alert.alert(
            "Confirm Mark Order as Complete",
            "This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => myCallback('CLOSE'),
                },
                { 
                    text: "OK", 
                    onPress: () => {
                        completeOrder(order)
                            .then(() => myCallback('OK'))
                            .catch(err => myCallback('OK', err));
                    }
                }
            ]
        );
    }

    // Complete order
    async function completeOrder(order: DeliveryOrder): Promise<void> {
        return httpCompleteOrder(order.id)
            .then(() => updateDeliveryOrder({...order, delivery_status_id: DeliveryStatus.COMPLETED.id }))
            .catch(handleHttpError)
    }

    
    // Cancel order with confirmation
    function confirmCancelOrder(order: DeliveryOrder, myCallback: (event: string, err?: any, success?: any) => void): void {
        Alert.alert(
            "Confirm Mark Order as Failed",
            "This order will be removed from the itinerary to be re-assigned. This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => myCallback('CLOSE'),
                },
                { 
                    text: "OK", 
                    onPress: () => {
                        cancelOrder(order)
                            .then(() => myCallback('OK'))
                            .catch(err => myCallback('OK', err));
                    }
                }
            ]
        );
    }

    // Cancel order
    async function cancelOrder(order: DeliveryOrder): Promise<void> {
        return httpUnassignOrder(order.id)
            .then(() => removeDeliveryOrder(order))
                .catch(handleHttpError)
    }

    // Record delivery order signature
    async function recordSignature(order: DeliveryOrder, signature: string): Promise<void> {
        return httpRecordOrderSignature(order.id, signature)
            .then(() => updateDeliveryOrder({...order, signature: signature }))
                .catch(handleHttpError)
    }

    const value: any = { 
        user, login, logout, handleHttpError,
        currentPosition, setCurrentPosition, 
        itinerarys, setItinerarys, 
        updateDeliveryOrder, 
        removeDeliveryOrder,
        confirmCompleteOrder, completeOrder,
        confirmCancelOrder, cancelOrder,
        recordSignature,
    }

    return (
        <AppContext.Provider 
            value={value}>
            { children }
        </AppContext.Provider>
    )
}

import { useState, useEffect, useContext, createContext  } from "react";
import * as Location from 'expo-location';
import { Order } from "../models/Order";
import { User } from "../models/User";
import { LatLng } from "react-native-maps";
import { LocationAccuracy } from "expo-location";

const AppContext = createContext<any>(null);

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);

    const [orders, setOrders] = useState<Order[]>([]);
    const [optimizedOrders, setOptimizedOrders] = useState<Order[]>([]);

    const [markers, setMarkers] = useState<any[]>([]);
    const [polylineCoords, setPolylineCoords] = useState<number[][]>([]);

    const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);

    useEffect(() => {
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


    function login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = { id: "1", username: username };
                setUser(user);
                resolve(user);
            }, 300);
        });
    }

    function logout(): void {
        setOrders([]);
        setUser(null);
    }

    const value: any = { user, login, logout, orders, setOrders, optimizedOrders, setOptimizedOrders, currentPosition, setCurrentPosition }

    return (
        <AppContext.Provider 
            value={value}>
            { children }
        </AppContext.Provider>
    )
}
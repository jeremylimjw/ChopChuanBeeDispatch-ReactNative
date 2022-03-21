import { Linking, Platform } from "react-native";
import { DeliveryOrder } from "../models/DeliveryOrder";

export function redirectToMaps(order: DeliveryOrder): void {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${order.latitude},${order.longitude}`;
    const label = '';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url!);
}
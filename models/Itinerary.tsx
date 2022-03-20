import { DeliveryOrder } from './DeliveryOrder';

export interface Itinerary {
    id: string;
    start_time: Date;
    session: string;
    origin_postal_code: string;
    longitude: number;
    latitude: number;
    created_at: Date;
    updated_at: Date;
    driver_id: string;
    delivery_orders: DeliveryOrder[];
}
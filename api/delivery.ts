import { axiosWrapper } from '.';

export async function httpGetItinerarys(employeeId: string): Promise<any> {
    return axiosWrapper.get(`/dispatch/itinerary`, { params: { employee_id: employeeId } })
        .then(res => res.data);
}

export async function httpCompleteOrder(deliveryOrderId: string): Promise<any> {
    return axiosWrapper.post(`/dispatch/deliveryOrder/complete`, { params: { id: deliveryOrderId } })
        .then(res => res.data);
}

export async function httpUnassignOrder(deliveryOrderId: string): Promise<any> {
    return axiosWrapper.post(`/dispatch/deliveryOrder/unassign`, { params: { id: deliveryOrderId } })
        .then(res => res.data);
}
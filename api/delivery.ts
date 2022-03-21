import { axiosWrapper } from '.';

export async function httpGetItinerarys(employeeId: string): Promise<any> {
    return axiosWrapper.get(`/dispatch/itinerary`, { params: { employee_id: employeeId } })
        .then(res => res.data);
}

export async function httpCompleteOrder(deliveryOrderId: string): Promise<any> {
    return axiosWrapper.post(`/dispatch/deliveryOrder/complete`, { id: deliveryOrderId })
        .then(res => res.data);
}

export async function httpUnassignOrder(deliveryOrderId: string): Promise<any> {
    return axiosWrapper.post(`/dispatch/deliveryOrder/unassign`, { id: deliveryOrderId })
        .then(res => res.data);
}

export async function httpRecordOrderSignature(deliveryOrderId: string, signature: string): Promise<any> {
    return axiosWrapper.post(`/dispatch/deliveryOrder/signature`, { id: deliveryOrderId, signature: signature })
        .then(res => res.data);
}
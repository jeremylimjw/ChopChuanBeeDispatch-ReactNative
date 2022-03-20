
import { axiosWrapper } from '.';

export async function httpLogin(username: string, password: string): Promise<any> {
    return axiosWrapper.post(`/auth`, { username: username, password: password })
        .then(res => res.data);
}

export async function httpLogout() {
    return axiosWrapper.get(`/auth/logout`)
        .then(res => res.data);
}
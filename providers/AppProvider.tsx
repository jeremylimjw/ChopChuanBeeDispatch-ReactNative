
import { useState, useEffect, useContext, createContext  } from "react";

const AppContext = createContext<any>(null);

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider({ children }: any) {
    const [user, setUser] = useState<any>(null);

    const [markers, setMarkers] = useState<any[]>([]);
    const [polylineCoords, setPolylineCoords] = useState<number[][]>([]);

    function login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setUser({ id: 1, username: username });
                resolve('foo');
            }, 300);
        });
    }

    function logout() {
        setUser(null);
    }

    const value: any = { user, login, logout }

    return (
        <AppContext.Provider 
            value={value}>
            { children }
        </AppContext.Provider>
    )
}
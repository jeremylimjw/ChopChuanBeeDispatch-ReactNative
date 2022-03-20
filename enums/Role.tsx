export const Role: { [key: string]: { id: number, name: string } } = {
    ADMIN: { id: 1, name: "Admin" },
    STAFF: { id: 2, name: "Staff" },
    DRIVER: { id: 3, name: "Driver" },
}
    
export function getRole(id: number): any {
    const foundKey = Object.keys(Role).filter(key => Role[key].id === id)[0];
    if (foundKey) {
        return Role[foundKey];
    }
    return null;
}
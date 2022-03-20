export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    contact_number: string;
    nok_name: string;
    nok_number: string;
    address: string;
    postal_code: string;
    discharge_date?: string | null;
    last_active?: string | null;
    activation_token?: string | null;
    role_id: number;
}
import { RootState } from '../store/store';
import { useSelector } from "react-redux";

export class Api {
    static baseUrl = "http://192.168.10.18:8000/api/";

    static async post<T>(url: string, data: any): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const dataResponse = await response.json();

        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async getUser<T>(url: string): Promise<any> {
        const token = useSelector((state: RootState) => state.auth.token)
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const dataResponse = await response.json();

        return {
            statusCode: response.status,
            data: dataResponse
        }
    }
}

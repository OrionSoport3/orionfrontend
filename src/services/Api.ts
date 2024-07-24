export class Api {
    static baseUrl = "http://192.168.10.169:8000/api/";

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

    static async withToken<T>(url: string, token: string): Promise<any> {
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
    static async postFile(url: string, data: any, token: string): Promise<any> {
        
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('nombre_carpeta', data.nombre_carpeta);
        formData.append('id_carpeta', data.id_carpeta);
        
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        });
        const dataResponse = await response.json();

        return {
            statusCode: response.status,
            data: dataResponse
        }
    }


 
    static async postActivitie<T>(url: string, data: any ,token: string | null): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        const dataResponse = await response.json();

        return {
            statusCode: response.status,
            data: dataResponse
        }
    }
 
}

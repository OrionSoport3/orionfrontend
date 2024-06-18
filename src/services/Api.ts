export class Api {
    static baseUrl  = "http://192.168.10.32:8000/api/";

    static async post <T>(url: string, data: any, navigate: Function): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status == 201) {
            navigate('/login');
        }

        const dataResponse = await response.json();
        
        return {
            statusCode: response.status,
            data: dataResponse,
        };
    }

    static async getUser<T>(url:string, data: any, navigate: Function): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.status == 200) {
            navigate('/');
        }

        const dataResponse = await response.json;

        return {
            statusCode: response.status,
            data: dataResponse
        }
    }
}

import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3002/api',
});

export async function getProductDetails(uuid: string): Promise<any> {

    return request.get(`/product/${uuid}`)
        .then(response =>
            response.status === 200 && response.data && response.data.length > 0
            ? response.data[0]
            : []
        )
        .catch(error => {
            return []
        })
}
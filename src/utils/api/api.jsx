import { request } from "../utils"

export const getIngredients = () => request(`ingredients`)

export const postOrderDetailsNumber = (array) => {
    return request(`orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'ingredients': array
        })
    })
}

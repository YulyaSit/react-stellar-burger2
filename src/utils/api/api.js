import { request } from "../utils"

export const getIngredients = () => {
    return request(`ingredients`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const postOrderDetailsNumber = (array) => {
    return request(`orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": array
        })
    })
}

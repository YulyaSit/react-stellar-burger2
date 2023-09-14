const url = "https://norma.nomoreparties.space/api/ingredients"
const urlOrderDetails = 'https://norma.nomoreparties.space/api/orders'

export const getIngredients = () => {
    return fetch(`${url}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const postOrderDetailsNumber = (array) => {
    return fetch(`${urlOrderDetails}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": array
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
}

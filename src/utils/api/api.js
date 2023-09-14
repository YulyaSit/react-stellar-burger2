const url = "https://norma.nomoreparties.space/api/ingredients"


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
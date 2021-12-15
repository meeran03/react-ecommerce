

const URL = 'http://localhost:3001'

export async function getProducts() {
    return await fetch(URL + '/items' ).then(async res => {
        let items = await res.json()
        return items
    })
}

export async function searchProducts(query) {
    return await fetch(URL + '/items?q=' + query ).then(async res => {
        return await res.json()
    })
}


export async function getProductDetail(id) {
    return await fetch(URL + '/items/' + id ).then(async res => {
        return await res.json()
    })
}

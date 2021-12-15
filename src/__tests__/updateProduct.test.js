import React from 'react';
import {getProducts} from '../services/fetchProducts'
import {updateProduct} from '../services/updateProducts'
import * as data from '../utils/data.json'

describe('Checking whether products are being fetched',() => {
    it("Before State",async() => {
        const response = await getProducts()
        expect(response).toEqual(data.items)
    })
})

describe('Checking whether database is being updated',() => {
    it("Doing the process",async() => {
        const response = await getProducts()
        let firstItem = response[0]
        firstItem.weight = firstItem.weight + 1;
        await updateProduct(firstItem.id,firstItem)
        const newResponse  = await getProducts()
        console.warn(newResponse[0])
        expect(newResponse[0].weight).toEqual(firstItem.weight)
    })
})




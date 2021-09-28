interface Item {
    itemName: string
    mediumImageUrls: string[]
    itemUrl: string
    itemCode: string
}

interface ProductsApiResponse {
    Items: Item[]
}

const productsFetcher = async (): Promise<ProductsApiResponse> => {
    const response = await fetch('https://akabeco-products-api.kuropen.workers.dev/prd')
    return response.json()
}

export default productsFetcher
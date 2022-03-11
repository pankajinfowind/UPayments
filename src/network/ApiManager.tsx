import axios from 'react-native-axios'


// Server Base URl
const BASE_URL = "https://62286b649fd6174ca82321f1.mockapi.io"

// Api End Points
const Product_EndPoint = "/case-study/products/"
const Category_EndPoint = "/case-study/categories/"

// Get product list
export const ProductList = async (
) => {
    return await axios.get(BASE_URL.concat(Product_EndPoint)).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    })
}

// Get product details 
export const ProductDetails = async (
    productID: string
) => {
    return await axios.get(BASE_URL.concat(Product_EndPoint + productID)).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    })
}

// Get category list
export const CategoryList = async (
) => {
    return await axios.get(BASE_URL.concat(Category_EndPoint)).then((response: any) => {
        return response
    }).catch((error: any) => {
        return error
    })
}
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

/**
 * THUNK CREATORS
 */
export const fetchProductsThunk = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(getProducts(products))
  } catch (error) {
    console.log('ERROR FETCHING PRODUCTS>>>', error)
  }
}

export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (error) {
      console.log('ERROR DELETING PRODUCT>>>', error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id)
    default:
      return state
  }
}

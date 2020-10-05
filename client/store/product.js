import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProductThunk = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(product))
    } catch (error) {
      console.log('ERROR FETCHING PRODUCT>>>', error)
    }
  }
}

export const updateProductThunk = (productId, updatedData) => {
  return async dispatch => {
    try {
      const {data: updatedProduct} = await axios.patch(
        `/api/products/${productId}`,
        updatedData
      )
      dispatch(updateProduct(updatedProduct))
    } catch (error) {
      console.log('ERROR UPDATING PRODUCT>>>', error)
    }
  }
}

/**
 * REDUCER
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

/**
 * THUNK CREATORS
 */
export const fetchCartThunk = userId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(cart))
    } catch (error) {
      console.log('ERROR FETCHING CART>>>', error)
    }
  }
}

export const addToCartThunk = (userId, cartId, productId, cartItemPrice) => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.post(`/api/users/${userId}/cart`, {
        cartId,
        productId,
        cartItemPrice
      })
      dispatch(updateCart(cart))
    } catch (error) {
      console.log('ERROR ADDING TO CART>>>', error)
    }
  }
}

export const deleteFromCartThunk = (userId, cartId, productId) => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.delete(`/api/users/${userId}/cart`, {
        cartId,
        productId
      })
      dispatch(updateCart(cart))
    } catch (error) {
      console.log('ERROR DELETING FROM CART>>>', error)
    }
  }
}

export const deleteCartItemThunk = (userId, cartId, productId) => {
  return async dispatch => {
    console.log('>>>>>>>', userId, cartId, productId)
    try {
      const {data: cart} = await axios.post(`/api/users/${userId}/cart`, {
        cartId,
        productId
      })
      dispatch(updateCart(cart))
    } catch (error) {
      console.log('ERROR ADDING TO CART>>>', error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return [...state, action.cart]
    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

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

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

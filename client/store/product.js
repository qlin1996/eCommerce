import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return {}
    default:
      return state
  }
}

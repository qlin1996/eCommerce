import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  render() {
    return <div>cart</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Cart)

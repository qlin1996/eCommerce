import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Product extends React.Component {
  render() {
    return (
      <div>
        <h1>SINGLE PRODUCT</h1>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({})

export default connect(mapState)(Product)

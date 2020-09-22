import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Products extends React.Component {
  render() {
    return (
      <div>
        <h1>ALL PRODUCTS</h1>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({})

export default connect(mapState)(Products)

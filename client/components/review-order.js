import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class ReviewOrder extends React.Component {
  render() {
    return (
      <div className="wrap">
        <div className="heading">
          <h2>Review Order</h2>
        </div>
        <div>
          <Link to="/confirmation">
            <button className="button" type="submit">
              Submit Order
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(ReviewOrder)

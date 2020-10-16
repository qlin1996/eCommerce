import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Products,
  Product,
  Cart,
  Checkout,
  ReviewOrder,
  Confirmation,
  Home,
  AddProduct,
  EditProduct,
  SearchProducts
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/search" component={SearchProducts} />
        <Route exact path="/products/:productId" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} history={history} />
        <Route path="/review-order" component={ReviewOrder} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/home" component={Home} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/user-home" component={UserHome} />
          </Switch>
        )}

        {isLoggedIn &&
          isAdmin === 'yes' && (
            <Switch>
              {/* Routes placed here are only available after admin logs in */}
              <Route
                exact
                path="/add-product"
                component={AddProduct}
                history={history}
              />
              <Route
                exact
                path="/products/:productId/edit"
                component={EditProduct}
                history={history}
              />
            </Switch>
          )}
        {/* Displays our Home component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import {logoutCart, fetchCartThunk} from '../store/cart'
import {me} from '../store/user'
import {NavLink} from 'react-router-dom'
import Modal from './modal'

const Navbar = ({
  handleClick,
  isLoggedIn,
  userId,
  cart,
  fetchCart,
  fetchMe
}) => {
  const [navClicked, setNavClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(
    () => {
      async function fetch() {
        await fetchMe()
        if (userId) await fetchCart(userId)
      }
      fetch()
    },
    [userId]
  )

  const handleClose = () => {
    setIsOpen(false)
  }

  const cartProducts = cart.products || []
  const cartItemCount = cartProducts.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.cartItem.cartItemQuantity,
    0
  )

  return (
    <header>
      <div>
        <i className="fas fa-bars" onClick={() => setNavClicked(true)} />
        <h1>Star Jewelry</h1>
      </div>
      <Modal open={isOpen} handleClose={handleClose} />
      <nav className={navClicked ? 'nav-clicked' : null}>
        <i className="fas fa-times" onClick={() => setNavClicked(false)} />
        {isLoggedIn ? (
          <React.Fragment>
            {/* When you are logged in */}
            <div className={navClicked ? 'flex-column' : null}>
              <NavLink
                activeClassName="selected"
                to="/home"
                onClick={() => setNavClicked(false)}
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/products"
                onClick={() => setNavClicked(false)}
              >
                All Products
              </NavLink>
            </div>

            <div className={navClicked ? 'flex-column' : null}>
              {navClicked ? (
                <NavLink
                  activeClassName="selected"
                  to="/search-products"
                  onClick={() => setNavClicked(false)}
                >
                  Search
                </NavLink>
              ) : (
                <NavLink
                  activeClassName="selected"
                  to="/search-products"
                  onClick={() => setNavClicked(false)}
                >
                  <i className="fas fa-search" />{' '}
                </NavLink>
              )}

              <a
                href="#"
                onClick={() => {
                  setNavClicked(false)
                  handleClick()
                }}
              >
                Logout
              </a>

              {navClicked ? (
                <NavLink
                  activeClassName="selected"
                  to="/cart"
                  onClick={() => {
                    setNavClicked(false)
                    setIsOpen(true)
                  }}
                >
                  Cart ({cartItemCount})
                </NavLink>
              ) : (
                <NavLink
                  activeClassName="selected"
                  to="/cart"
                  onClick={() => setNavClicked(false)}
                >
                  <div className="count">{cartItemCount}</div>
                  <i className="fas fa-shopping-cart" />
                </NavLink>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* When you are not logged in*/}
            <div className={navClicked ? 'flex-column' : null}>
              <NavLink
                activeClassName="selected"
                to="/home"
                onClick={() => setNavClicked(false)}
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/products"
                onClick={() => setNavClicked(false)}
              >
                All Products
              </NavLink>
            </div>
            {navClicked ? (
              <React.Fragment>
                <NavLink
                  activeClassName="selected"
                  to="/search-products"
                  onClick={() => setNavClicked(false)}
                >
                  Search
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to="/login"
                  onClick={() => setNavClicked(false)}
                >
                  Login
                </NavLink>
              </React.Fragment>
            ) : (
              <div>
                <NavLink
                  activeClassName="selected"
                  to="/search-products"
                  onClick={() => setNavClicked(false)}
                >
                  <i className="fas fa-search" />
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to="/login"
                  onClick={() => setNavClicked(false)}
                >
                  <i className="fas fa-user-alt" />
                </NavLink>
                <NavLink
                  to="/"
                  activeClassName="selected"
                  onClick={() => {
                    setNavClicked(false)
                    setIsOpen(true)
                  }}
                >
                  <i className="fas fa-shopping-cart" />
                </NavLink>
              </div>
            )}
          </React.Fragment>
        )}
      </nav>
      <div className="hr">
        <hr />
      </div>
    </header>
  )
}

const mapState = state => ({
  isLoggedIn: state.user.id,
  userId: state.user.id,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
    dispatch(logoutCart())
  },
  fetchCart: userId => dispatch(fetchCartThunk(userId)),
  fetchMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Navbar)

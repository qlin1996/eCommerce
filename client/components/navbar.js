import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {NavLink} from 'react-router-dom'

const Navbar = ({handleClick, isLoggedIn}) => {
  const [navClicked, setNavClicked] = useState(false)

  return (
    <header>
      <div>
        <i className="fas fa-bars" onClick={() => setNavClicked(true)} />
        <h1>Star Jewelry</h1>
      </div>
      <nav className={navClicked ? 'nav-clicked' : null}>
        <i className="fas fa-times" onClick={() => setNavClicked(false)} />
        {isLoggedIn ? (
          <React.Fragment>
            {/* After you login */}
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
                  onClick={() => setNavClicked(false)}
                >
                  Cart
                </NavLink>
              ) : (
                <NavLink
                  activeClassName="selected"
                  to="/cart"
                  onClick={() => setNavClicked(false)}
                >
                  <i className="fas fa-shopping-cart" />
                </NavLink>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Before you login */}
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
                  to="/login"
                  onClick={() => setNavClicked(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to="/cart"
                  onClick={() => setNavClicked(false)}
                >
                  Cart
                </NavLink>
              </React.Fragment>
            ) : (
              <div>
                <NavLink
                  activeClassName="selected"
                  to="/login"
                  onClick={() => setNavClicked(false)}
                >
                  <i className="fas fa-user-alt" />
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to="/cart"
                  onClick={() => setNavClicked(false)}
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

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

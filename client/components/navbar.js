import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

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
              <Link to="/home" onClick={() => setNavClicked(false)}>
                Home
              </Link>
              <Link to="/products" onClick={() => setNavClicked(false)}>
                All Products
              </Link>
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
                <Link to="/cart" onClick={() => setNavClicked(false)}>
                  Cart
                </Link>
              ) : (
                <Link to="/cart" onClick={() => setNavClicked(false)}>
                  <i className="fas fa-shopping-cart" />
                </Link>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Before you login */}
            <div className={navClicked ? 'flex-column' : null}>
              <Link to="/products" onClick={() => setNavClicked(false)}>
                All Products
              </Link>
            </div>
            {navClicked ? (
              <React.Fragment>
                <Link to="/login" onClick={() => setNavClicked(false)}>
                  Login
                </Link>
                <Link to="/cart" onClick={() => setNavClicked(false)}>
                  Cart
                </Link>
              </React.Fragment>
            ) : (
              <div>
                <Link to="/login" onClick={() => setNavClicked(false)}>
                  <i className="fas fa-user-alt" />
                </Link>
                <Link to="/cart" onClick={() => setNavClicked(false)}>
                  <i className="fas fa-shopping-cart" />
                </Link>
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

/**
 * CONTAINER
 */
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

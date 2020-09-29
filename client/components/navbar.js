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
            {/* The navbar will show these links after you log in */}
            <Link to="/home" onClick={() => setNavClicked(false)}>
              Home
            </Link>
            <Link to="/products" onClick={() => setNavClicked(false)}>
              All Products
            </Link>
            <a
              href="#"
              onClick={() => {
                setNavClicked(false)
                handleClick()
              }}
            >
              Logout
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* The navbar will show these links before you log in */}
            <Link to="/products" onClick={() => setNavClicked(false)}>
              All Products
            </Link>
            <Link to="/login" onClick={() => setNavClicked(false)}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setNavClicked(false)}>
              Sign Up
            </Link>
          </React.Fragment>
        )}
      </nav>
      <hr />
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

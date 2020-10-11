import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../store/user'
import {Link} from 'react-router-dom'

const Signup = props => {
  const {handleSubmit, error} = props

  return (
    <div className="auth-grid">
      <div className="auth-card">
        <h2>Create Account</h2>
        <div className="google-icon">
          <a href="/auth/google">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <p>or use your email for registration</p>
        {error && <small className="error"> {error.response.data} </small>}
        <form onSubmit={handleSubmit} name={name}>
          <input name="firstName" type="text" placeholder="First Name" />
          <input name="lastName" type="text" placeholder="Last Name" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <div>
            <button className="button" type="submit">
              Sign up
            </button>
          </div>
        </form>
        <small className="auth-question">
          <Link to="/login">Already have an account? Login here.</Link>
        </small>
      </div>
      <div className="auth-card">
        <img
          className="auth-img"
          src="https://www.datocms-assets.com/25216/1600280578-homepage-trio-1.jpg?q=40&auto=format&w=1136"
        />
      </div>
    </div>
  )
}

const mapSignup = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(signup(email, password, firstName, lastName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(Signup)

import React from 'react'
import {connect} from 'react-redux'
import Home from './home'

export const UserHome = props => {
  const {firstName, lastName} = props.user

  return (
    <div>
      <h3 className="text-align-center">
        Welcome back {firstName} {lastName}!
      </h3>
      <Home />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

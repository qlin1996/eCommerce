import React from 'react'
import {Link} from 'react-router-dom'

const Modal = ({open, handleClose}) => {
  if (!open) return null
  return (
    <React.Fragment>
      <div className="overlay" />
      <div className="modal">
        <div className="flex">
          <p>You must have an account to shop!</p>
          <i className="far fa-times-circle" onClick={handleClose} />
        </div>
        <div>
          <Link to="/login" className="modal-button">
            <button className="continue" type="button" onClick={handleClose}>
              Login
            </button>
          </Link>
          <Link to="/signup" className="modal-button">
            <button className="continue" type="button" onClick={handleClose}>
              Signup
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Modal

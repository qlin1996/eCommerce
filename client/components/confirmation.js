import React from 'react'
import {Link} from 'react-router-dom'

const Confirmation = () => {
  return (
    <div className="wrap">
      <div className="heading">
        <h2>Confirmation</h2>
      </div>
      <div>
        <img src="https://www.datocms-assets.com/25216/1602022240-hp-banner-classic-2-2.jpg?q=40&auto=format&w=2880" />
        <p>Thank you for shopping with us. Your order has been submitted.</p>
      </div>
      <div className="pagination">
        <Link to="/products">
          <button className="button" type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Confirmation

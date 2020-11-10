import React, {useState} from 'react'
import {connect} from 'react-redux'

export const Home = props => {
  const {firstName, lastName} = props.user
  const [slide, setSlide] = useState(1)

  const minusSlides = () => {
    if (slide === 1) setSlide(3)
    else setSlide(slide - 1)
  }

  const plusSlides = () => {
    if (slide === 3) setSlide(1)
    else setSlide(slide + 1)
  }

  return (
    <div>
      {firstName && (
        <h3 className="text-align-center">
          Welcome back {firstName} {lastName}!
        </h3>
      )}
      <div className="slideshow-container">
        <div className={slide !== 1 ? 'slides' : ''}>
          <img src="//cdn.shopify.com/s/files/1/0470/6941/files/1600px_by_900px_home_slide_8_1600x.jpg?v=1600216174" />
        </div>
        <div className={slide !== 2 ? 'slides' : ''}>
          <img src="//cdn.shopify.com/s/files/1/0470/6941/files/1600px_by_900px_home_slide_1_0275c838-4ad7-4f64-8d2b-742ebcff1ae4_1600x.jpg?v=1600215467" />
        </div>
        <div className={slide !== 3 ? 'slides' : ''}>
          <img src="//cdn.shopify.com/s/files/1/0470/6941/files/1600px_by_900px_home_slide_4_1600x.jpg?v=1600215352" />
        </div>
        <a className="prev" onClick={minusSlides}>
          &#10094;
        </a>
        <a className="next" onClick={plusSlides}>
          &#10095;
        </a>
      </div>
      <div className="blurb">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Home)

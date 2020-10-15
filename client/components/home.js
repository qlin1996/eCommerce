import React, {useState} from 'react'

export const Home = () => {
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
      <div className="slideshow-container">
        <div className={slide !== 1 ? 'slides' : ''}>
          <img src="https://www.datocms-assets.com/25216/1602022197-hp-banner-classic2.jpg?q=40&auto=format&w=2880" />
        </div>
        <div className={slide !== 2 ? 'slides' : ''}>
          <img src="https://www.datocms-assets.com/25216/1600280698-d-homepage-unmatched-diamonds.jpg?q=40&auto=format&w=2880" />
        </div>
        <div className={slide !== 3 ? 'slides' : ''}>
          <img src="https://www.datocms-assets.com/25216/1602022240-hp-banner-classic-2-2.jpg?q=40&auto=format&w=2880" />
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

export default Home

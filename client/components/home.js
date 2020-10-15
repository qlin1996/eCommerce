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
        <div className={slide !== 1 && 'slides'}>
          <img src="https://auvere.com/content/revamp/sneak-peek/december2020/3.jpg" />
        </div>
        <div className={slide !== 2 && 'slides'}>
          <img src="https://auvere.com/content/revamp/sneak-peek/december2020/2.png" />
        </div>
        <div className={slide !== 3 && 'slides'}>
          <img src="https://auvere.com/content/revamp/sneak-peek/december2020/1.jpg" />
        </div>
        <a className="prev" onClick={minusSlides}>
          &#10094;
        </a>
        <a className="next" onClick={plusSlides}>
          &#10095;
        </a>
      </div>
    </div>
  )
}

export default Home

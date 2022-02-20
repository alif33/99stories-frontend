import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import  settings  from './../../../../config/index';
const TrandingContests = ({ contests }) => {
  console.log(contests)

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   autoPlay: true

  // }

  const settings = {

    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoPlay: true,
    speed: 1000,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <section id="tranding-part">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="title">
              <h3>Tranding Contests</h3>
            </div>
          </div>
        </div>
        <div className="tranding-slider">
          <Slider {...settings}>
            {/* {
                contests.map(item=>
                  <div key={item.id} className="tranding-item">
                    <a href="#"><img src="images/tranding-book.png" alt="tranding-book" /></a>
                    <p>{item.id}</p>
                  </div>
                  )
              } */}

            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>
            <div className="tranding-item">
              <a href="#">
                <img  src="images/tranding-book.png" alt="tranding-book" />
              </a>
              <p>fgdgfgdgdfgdfgdfgdfg</p>
            </div>

          </Slider>
        </div>
      </div>
    </section>
  )
}

export default TrandingContests;

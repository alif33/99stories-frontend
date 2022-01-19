import React from 'react'
import Slick from 'react-slick'
import { settings } from '../../../config/index'

const SliderComponent = ({ contests }) => {

    return (
      <section id="tranding-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <div className="title">
                <h3>Tranding Contents</h3>
              </div>
            </div>
          </div>
          <div className="tranding-slider">
            <Slick {...settings}>
              {/* {
                contests.map(item=>
                  <div key={item.id} className="tranding-item">
                    <a href="#"><img src="images/tranding-book.png" alt="tranding-book" /></a>
                    <p>{item.id}</p>
                  </div>
                  )
              } */}

                  <div className="tranding-item">
                    <a href="#"><img src="images/tranding-book.png" alt="tranding-book" /></a>
                    <p>fgdgfgdgdfgdfgdfgdfg</p>
                  </div>
            </Slick> 
          </div>
        </div>
      </section>
    )
}

export default SliderComponent

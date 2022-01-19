import React from 'react'
import Slick from 'react-slick'
import { settings } from '../../../config/index'

const SliderComponent = ({ contests }) => {

    console.log(contests)

    return (

        <Slick {...settings}>
            <div className="tranding-item">
                <a href="/"><img src="images/tranding-book.png" alt={'xfggvgfdgg'} /></a>
                <a href="/contests"><p>Book Cover</p></a>
            </div>
            <div className="tranding-item">
                <a href="/"><img src="images/tranding-book.png" alt={'xfggvgfdgg'} /></a>
                <a href="/contests"><p>Book Cover</p></a>
            </div>
            <div className="tranding-item">
                <a href="/"><img src="images/tranding-book.png" alt={'xfggvgfdgg'} /></a>
                <a href="/contests"><p>Book Cover</p></a>
            </div>
            <div className="tranding-item">
                <a href="/"><img src="images/tranding-book.png" alt={'xfggvgfdgg'} /></a>
                <a href="/contests"><p>Book Cover</p></a>
            </div>



            {/* {
                contests?.map(
                    item=><div className="tranding-item">
                            <a href="/"><img src="images/tranding-book.png" alt={'xfggvgfdgg'} /></a>
                            <a href="/contests"><p>Book Cover</p></a>
                        </div>)
            } */}
        </Slick>
    )
}

export default SliderComponent

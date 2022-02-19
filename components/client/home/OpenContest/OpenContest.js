import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGE_URL } from '../../../../helpers/HttpService'


const OpenContest = ({ contests }) => {
    
    return (
        
      <section id="story-part">
        <div className="container">
            <div className="row">
            <div className="col-lg-12 col-sm-12">
                <div className="title">
                <h3><a href="#">Open Contest</a></h3>
                </div>
            </div>
            </div>
            <div className="row">
            {
                contests?.map(item=>{
                    return(
                        <div className="col-lg-4 col-sm-4 col-md-4">
                            <div className="story-item">
                                <div className="img">
                                    <Link href="">
                                        <div className={'image-container'}>
                                            <img 
                                                src={ IMAGE_URL+item.contest_image } 
                                                layout="fill" 
                                                className={'image'} 
                                            />
                                        </div>
                                        {/* <a>
                                            <img src={ IMAGE_URL+item.contest_image } alt={ item.contest_title } />
                                        </a> */}
                                    </Link>
                                </div>
                            <h2>
                                <Link href="">
                                    <a>{item.contest_title}</a>
                                </Link>
                            </h2>
                            <p><a href="#"> Details</a> Description in the link below.</p>
                                <div className="button">
                                    <Link href={`contest/${item.slug}`}>
                                        <a>View Contest</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    </section>
    )
}

export default OpenContest;

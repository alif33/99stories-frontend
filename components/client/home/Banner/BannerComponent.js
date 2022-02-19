import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setStory } from '../../../../redux/stories/actions'
const BannerComponent = () => {
    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(setStory())
    // }, [])

    return (
        <section id="banner-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="banner-win">
                        <div className="img">
                        <img src="images/banner-1.png" alt="banner-1" />
                        </div>
                        <h3>Win A Contest</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry.</p>
                        <div className="button">
                        <a href="#">Perticipate a Contest</a>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="banner-win">
                        <div className="img">
                        <img src="images/banner-2.png" alt="banner-2" />
                        </div>
                        <h3 className="create">Create New Contest </h3>
                        <p>Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry.</p>
                        <div className="button">
                        <a href="#" className="create-btn">Create a Contest</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerComponent



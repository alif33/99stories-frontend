import React from 'react'

const Footer = () => {
    return (
        <section id="footer-part">
            <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-8">
                <div className="footer-content">
                    <span> © 99 Stories</span>
                    <ul>
                    <li><i className="fas fa-circle" />By ...</li>
                    <li><i className="fas fa-circle" />Privacy Policy</li>
                    <li><i className="fas fa-circle" />Terms &amp; Condition</li>
                    <li><i className="fas fa-circle" />Sitemap</li>
                    </ul>
                </div>
                </div>
                <div className="col-lg-4 col-md-4">
                <div className="icon">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-twitter" />
                    <i className="fab fa-instagram" />
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Footer

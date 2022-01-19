import { API_URL } from '../../../helpers/HttpService'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton,
    PinterestShareButton
  } from 'react-share'

const SocialShare = ({uri}) =>{
    
  return (
    <div className="social">
        <a href="#">
            <FacebookShareButton  url={API_URL+uri}>
                <i className="fab fa-facebook-f" />
            </FacebookShareButton>
        </a>
        <a href="#">
            <TwitterShareButton  url={API_URL+uri}>
                <i className="fab fa-twitter" />
            </TwitterShareButton>
        </a>
        <a href="#">
            <RedditShareButton  url={API_URL+uri}>
                <i className="fab fa-reddit" />
            </RedditShareButton>
        </a>
        <a href="#">
            <LinkedinShareButton  url={API_URL+uri}>
                <i className="fab fa-linkedin" />
            </LinkedinShareButton>
        </a>
    </div>  
  );
};

export default SocialShare;

import { APP_URL, IMAGE_URL, postReq } from '../../helpers/HttpService'
import parse from 'html-react-parser'
import Layout from '../../layouts/client'
import { useRouter } from 'next/dist/client/router'
import SocialShare from '../../components/client/common/SocialShare'

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}


export async function getStaticProps(ctx) {
  const { slug } = ctx.params
  const contest = await postReq(`/contest/${slug}`,{})
  return {
    props: {
        item: contest
    }
  }
}


export default function Contest ({ item }) {
 const router = useRouter()
  console.log(item)
 const handleParticipate = id => {
  router.push({
    pathname: '/dashboard/participate',
    query: {
      id: id
    }
  })
 }
  return (
    <Layout>
      <section id="stories-part">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="title">
              <h3><a href="#">Contest Details</a></h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="wrapper">
                <h2>{ item.contest_title }</h2>
                <div className="img">
                  <a href="#">
                    <img 
                      src={ IMAGE_URL+item.contest_image } 
                      alt={ item.contest_title } 
                    />
                  </a>
                </div>
                <div className="person">
                  <span><i className="far fa-calendar-alt" />Start Form : 25 Nov 2021</span>
                  <span><i className="far fa-calendar-alt" />End  : 27 Nov 2021</span>
                  <span>
                    <div className="taka">
                      <i className="fas fa-rupee-sign" />{ item.contest_prize }
                    </div>
                  </span>
                </div>
                { parse(item.contest_description) }
                <div className="story-icon">
                  <div className="right-icon contest-left">
                    <span>Share This Post </span>
                    <SocialShare
                      uri={`/contest/${item.slug}`}
                    />
                  </div>
                  <div className="contest-right">
                        <a onClick={ ()=>handleParticipate(item.id) }>Perticipate</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}



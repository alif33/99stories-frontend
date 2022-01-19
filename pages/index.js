import Layout from '../layouts/client'
import BannerComponent from '../components/client/Home/BannerComponent'
import SliderComponent from '../components/client/Home/SliderComponent'
import ContestsComponent from '../components/client/home/ContestsComponent'
import FaqComponent from '../components/client/Home/FaqComponent'
import { getData } from '../helpers/HttpService'


export default function Home({ contests }) {
  console.log(contests)
  return (
    <Layout>
        <BannerComponent/>
        <SliderComponent
          contests={
            contests
          }
        />
        <ContestsComponent
            contests={
              contests
            }
        />
        <FaqComponent/>
    </Layout>
  )
}


export async function getStaticProps() {
  const contests = await getData('/contests')
  return {
    props: {
        contests
    }
  }
}
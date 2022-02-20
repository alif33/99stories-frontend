import Layout from '../layouts/client'
import FaqComponent from '../components/client/Home/FaqComponent'
import { getData } from '../helpers/HttpService'
import BannerComponent from '../components/client/home/Banner/BannerComponent'
import TrandingContests from '../components/client/home/TrandingContest/TrandingContests'
import OpenContest from '../components/client/home/OpenContest/OpenContest'


export default function Home({ contests }) {
  console.log(contests)
  return (
    <Layout>
        <BannerComponent/>
        <TrandingContests
          contests={
            contests
          }
        />
        <OpenContest
            contests={
              contests
            }
        />
        <FaqComponent/>
    </Layout>
  )
}


export async function getServerSideProps() {
  const contests = await getData('/contests')
  return {
    props: {
        contests
    }
  }
}


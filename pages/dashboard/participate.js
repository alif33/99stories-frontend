import React from 'react'
import { useRouter } from 'next/dist/client/router'
import ParticipateStory from '../../components/dashboard/users/stories/ParticipateStory'
import { userAuth } from '../../helpers/requireAuthentication'

export default function Participate(){
    const router = useRouter()
    return (
        <>
             <ParticipateStory 
                id={ router?.query?.id }
            />
        </>
    )
}

export const getServerSideProps = userAuth( context => {
    return {
      props: {}
    }
})
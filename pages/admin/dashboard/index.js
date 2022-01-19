import React from 'react'
import { adminAuth } from '../../../helpers/requireAuthentication'
import Layout from '../../../layouts/admin'

export default function Dashboard(){
    return (
        <Layout>
        </Layout>
    )
}

export const getServerSideProps = adminAuth( context => {
    return {
      props: {}
    }
})
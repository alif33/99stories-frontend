import React, { useState, useEffect } from 'react'
import { adminAuth } from '../../../helpers/requireAuthentication';
import Layout from '../../../layouts/admin';
import CommonTag from './../../../components/client/common/Tag/CommonTags';



export default function Tags() {
    return (
        
            <Layout>
                <CommonTag/>
            </Layout>
        
    )
}

export const getServerSideProps = adminAuth(context => {
    return {
        props: {}
    }
})
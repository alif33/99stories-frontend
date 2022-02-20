
import Layout from '../../layouts/user';
import { userAuth } from './../../helpers/requireAuthentication';
import CommonTag from './../../components/client/common/Tag/CommonTags';
const Tags = () => {
    return (
        <>
            <Layout>
                <CommonTag />
            </Layout>
        </>
    );
};

export default Tags;


export const getServerSideProps = userAuth(context => {
    return {
        props: {}
    }
})
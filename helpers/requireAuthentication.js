const cookie = require('cookie')

export function userAuth(gssp) {
    return async (context) => {
        const { req, res } = context
        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie)
           
            if (!cookies.user_token) {
                return {
                    redirect: {
                        destination: '/signin',
    
                    }
                }
            } 

        }else{
            return {
                redirect: {
                    destination: '/signin',

                }
            }
        }
        return await gssp(context)
    }
}

export function adminAuth(gssp) {
    return async (context) => {
        const { req, res } = context
        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie)
           console.log(cookies);
            if (!cookies._token) {
                return {
                    redirect: {
                        destination: '/admin/login',
    
                    }
                }
            } 

        }else{
            return {
                redirect: {
                    destination: '/admin/login',

                }
            }
        }
        return await gssp(context)
    }
}
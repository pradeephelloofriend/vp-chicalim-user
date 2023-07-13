
module.exports = {
    modules: true,
    images: {
        //domains: ['localhost'],
        
        loader: "default",
        domains: ["res.cloudinary.com","speedtrack.co.in","gitlab.com"],

    },
    env:{
        // API_PATH:"http://localhost:1339",
        API_PATH:"https://speedtrack.co.in/wp-chicalim/wp-json/wp/v2/",
        SQL_API_PATH:"https://speedtrack.co.in/api/react/vp-chicalim",
        WP_API_PATH:"https://speedtrack.co.in/wp-chicalim/wp-json/wp/v2/",
        GQL_API_PATH:'https://speedtrack.co.in/wp-chicalim/graphql',
        JWT_TOKEN:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY1NzU1ODkxNCwiZXhwIjoxODE1MjM4OTE0fQ.kg71BT59KvKXpk6w0i-rBdx_At1NQWthSgmyXieYjiA',

        RAZORPAY_KEY:'rzp_test_T8G06mWoHkjoJ5',
        RAZORPAY_SECRET:'G2mHYKzqQ8xZ0rXnXHzSm51Q',
        //live key
        /*RAZORPAY_KEY:'rzp_live_wLrbTz7s22ZkmB',
        RAZORPAY_SECRET:'olCvcaGPeTOdxz0iZwVwjkRw'*/

        /**GoogleRecaptcha key */
        GCAPTACHA_SITE_KEY:'6LeB6u8mAAAAAL8gsl8Qpo8m3kkBJ-Gm30iri1Sk',
        GCAPTCHA_SEC_KEY:'6LeB6u8mAAAAAJhCP9swXiPvD7gjLp0iRADR8Z7H',

        /**twilo setup */
        TWILO_SID:'AC2b0df5e76f601d2c9ed1af4ae1c1ade8',
        TWILO_TOKEN:'43ad5556ed0497316c6ebdf6c4e15e40',
        TWILO_NUMBER:'+13258800801'
    },
    // Uncomment the line below to enable basePath, pages and
    // redirects will then have a path prefix (`/app` in this case)
    //
    // basePath: '/app',

    async redirects() {
        return [
            {
                source: '/logout',
                destination: '/',
                permanent: true,
            },
            // Path Matching - will match `/old-blog/a`, but not `/old-blog/a/b`
            /*{
                source: '/old-blog/:slug',
                destination: '/news/:slug',
                permanent: false,
            },
            // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
            {
                source: '/blog/:slug*',
                destination: '/news/:slug*',
                permanent: false,
            },
            // Regex Path Matching - The regex below will match `/post/123` but not `/post/abc`
            {
                source: '/post/:slug(\\d{1,})',
                destination: '/news/:slug',
                permanent: false,
            },*/
        ]
    },
}

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
/*
        RAZORPAY_KEY:'rzp_test_b2yM4suN8KttZf',
        RAZORPAY_SECRET:'xIIzAutlaVvsvjNVDzo7Keeg '*/

        //live key
        RAZORPAY_KEY:'rzp_live_wLrbTz7s22ZkmB',
        RAZORPAY_SECRET:'olCvcaGPeTOdxz0iZwVwjkRw'
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
const API_URL = process.env.WP_API_PATH

export default async function getCertificateData(req, res) {
    //console.log("req nom", req.query.slug)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}pages`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.JWT_TOKEN}`
            },
            body: JSON.stringify({})
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
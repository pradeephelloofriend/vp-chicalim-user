const API_URL = process.env.SQL_API_PATH

export default async function getEmailVerify(req, res) {
    //console.log("req nom", req.query.slug)
    const {email}=req.body
    //console.log("req nom", wNo)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/getEmailVerify.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify({
                email:email
            })
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
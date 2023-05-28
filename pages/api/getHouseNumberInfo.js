const API_URL = process.env.SQL_API_PATH

export default async function getHouseNumberData(req, res) {
    //console.log("req nom", req.query.slug)
    const {hNo}=req.body
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/getHouseNumberData.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.JWT_TOKEN}`
            },
            body: JSON.stringify({
                hNo:hNo //house number
            })
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
const API_URL = process.env.SQL_API_PATH

export default async function getHouseNumberData(req, res) {
    //console.log("req nom", req.query.slug)
    const {hNo,wNo}=req.body
    //console.log("req nom", wNo)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/getHouseNumberData.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify({
                hNo:hNo, //house number
                wNo:wNo //ward No
            })
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
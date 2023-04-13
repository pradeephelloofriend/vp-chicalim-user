const API_URL = process.env.SQL_API_PATH

export default async function updateTaxPayment(req, res) {
    
    const { payId,selctionData,uid } = req.body;
    //console.log("req nom", hNo)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/updateTaxData.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            },
            body: JSON.stringify({
                uid:uid,
                payId:payId,
                taxData:selctionData
            })
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
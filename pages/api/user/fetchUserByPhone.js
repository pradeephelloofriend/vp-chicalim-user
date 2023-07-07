const API_URL = process.env.SQL_API_PATH

export default async function fetchUserByPhone(req, res) {
    
    const { number } = req.body;
    //console.log("req nom", number)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/fetch-user-by-phone.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            },
            body: JSON.stringify({
                number:number
            })
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
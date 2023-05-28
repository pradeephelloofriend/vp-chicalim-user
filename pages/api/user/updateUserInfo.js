const API_URL = process.env.SQL_API_PATH

export default async function updateUserInfo(req, res) {
    
    const { userId,vId,add1,taluka,state} = req.body;
    //console.log("req nom", userId)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/update-user-info.php`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            },
            body:JSON.stringify({
                userId: userId,
                vId:vId,
                add1:add1,
                taluka:taluka,
                state:state
                
                
            })
            
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
const API_URL = process.env.SQL_API_PATH

export default async function insetHouseNo(req, res) {
    
    const { userId,userName,email,mNo,hNo,wNo,houseVerify} = req.body;
    //console.log("req nom", userId+","+userName+","+email+","+hNo+","+aNo+","+wNo)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try{
        const result= await fetch(`${API_URL}/insert-user-info.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                
            },
            body:JSON.stringify({
                userId: userId,
                userName: userName,
                email:email,
                mNo:mNo,
                hNo:hNo,
                wNo:wNo,
                houseVerify:houseVerify
                
                
            })
            
        })
        const data= await result.json()
        return res.json(data)

    }catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
        
        
    
}
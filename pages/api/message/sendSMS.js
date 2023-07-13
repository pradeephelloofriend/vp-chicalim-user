const client = require('twilio')(process.env.TWILO_SID, process.env.TWILO_TOKEN);
export default async function getEmailVerify(req, res) {
    //console.log("req nom", req.query.slug)
    const { mNo } = req.body
    //console.log("req nom", wNo)
    /**********
     * slug[0]=item id,slug[1]=quantity,slug[2]=userid
     */
    //let data
    try {
            client.messages
            .create({
                from: process.env.TWILO_NUMBER,
                to:'+91'+mNo,
                body:'Payment done'
            })
            .then((message) => {
                //res.send(JSON.stringify({ success: true }));
                return res.json({ success: message })
            })
            .catch(err => {
                console.log(err);
                //res.send(JSON.stringify({ success: false }));
                return res.json({ success: true })
            })
        //const data = await result.json()
        //return res.json(data)

    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }



}
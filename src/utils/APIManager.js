import superagent from 'superagent'

export default  {

    get: (endpoint, params, callback) => {
        superagent
        .get(endpoint)
        .query(null)
        .set('Accept', 'application/json')   //.set('accepte', 'app/json')
        .end((err, response)=>{   //.result((err, result)=>{
            if (err) {
                // var err = err.message || err
                callback(err, null)//alert(err)
                return
            }

            callback(null, response.body)//console.log(JSON.stringify(response.body))
        })          
    },

    // get: (endpoint, params, callback) => {
 //     superagent
 //     .get(endpoint)
 //     .query(null)
 //     .set('Accept', 'application/json')   //.set('accepte', 'app/json')
 //        .end((err, response)=>{   //.result((err, result)=>{
 //            if (err) {
 //             // var err = err.message || err
 //             callback(err, null)//alert(err)
 //                return
 //            }

 //            callback(null, response.body)//console.log(JSON.stringify(response.body))
 //        })           
    // },

    post: ((endpoint, params, callback) => {
        superagent
        .post(endpoint)  //.get(endpoint)
        .send(params)   //.query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
                callback(err, null)
                return
            }
            console.log('APIManager: '+JSON.stringify(response.body))
            const confirmation = response.body.confirmation
            if (confirmation != 'success'){
                callback({message: response.body.message}, null)
                return
            }

            callback(null, response.body)   //callback(null, response.result)
        })
    }),

    upload: (endpoint, file, params, callback) => {
        console.log('APIManager - upload: ')
        let uploadRequest = superagent.post(endpoint)

        uploadRequest.attach('file', file)
        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, resp) => {
            if (err) {
                callback(err, null)
                return
            }

            callback(null, resp)
        })
    }
}
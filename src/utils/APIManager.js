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
	    }
}
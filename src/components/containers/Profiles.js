import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Profiles extends Component {
    constructor(){
    	super()  
    	this.state = {
    		profile: []
    	}
    }

    componentDidMount(){
         APIManager.get('/api/profile', null, (err, response) =>{
         	if (err) {
         		alert(err)
         		return
         	}

            console.log(JSON.stringify(response))
            var results = response.results
            this.setState({
            	profile: response.results  //profile: response
            })

         })
    }

	render(){
        var list = this.state.profile.map((profile, i) => {
        	return (
                <li key={profile.id}>{profile.email}</li>
        	)
        })
		
		return(
			<div>
			    <ol>
			        { list }
			    </ol>
			</div>
		)
	}
} 

export default Profiles
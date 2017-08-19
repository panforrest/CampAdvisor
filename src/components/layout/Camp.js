import React, { Component } from 'react'
import {APIManager} from '../../utils' 

class Camp extends Component {
    constructor(){
    	super()
    	this.state = {
    		camp: {
                title:''
    		}
    	}
    }

	componentDidMount(){
        APIManager.get('/api/camp?slug='+this.props.slug, null, (err, response) => {	
        	if (err){
        		const msg = err.message || err
        		alert(msg)
        		return
        	}
        	console.log(JSON.stringify(response.results))  //(response.result))
        	var camp = response.results[0]
        	this.setState({
        		camp: camp
        	})
        })
	}    

	render(){
		return(
			<div>
			    This is Camp component.
			    <h2>{this.state.camp.title}</h2>
			</div>
		)
	}
}

export default Camp
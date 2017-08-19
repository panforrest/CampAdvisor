import React, { Component } from 'react'
import { Camps, Admin } from '../containers'

class Main extends Component {
    componentDidMount(){
    	console.log('Main componentDidMount:'+this.props.page)
    }

	render(){
		return(
			<div>
			    This is Main layout.
			    < Admin />
                < Camps />
	        </div>
		)
	}
}

export default Main
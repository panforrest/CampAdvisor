import React, { Component } from 'react'
import Camps from './Camps'
import Admin from './Admin'
// import Camp from '../layout/Camp'
import { Camp, Register, Account } from '../layout'

class Main extends Component {
    componentDidMount(){
    	console.log('Main componentDidMount props.page: '+this.props.page)
        // console.log('page: '+JSON.stringify(this.state.page))
        // alert('slug: '+JSON.stringify(this.state.slug))
    }

	render(){
        var content = null
        var page = this.props.page
        if (page == 'home')
        	content = <div><Camps /><Admin /></div>

        if (page == 'camp')
            content = <Camp slug={this.props.slug} />

        if (page == 'register')
            content = <Register />

        if (page == 'account')
            content = <Account />

		return(
			<div>
                { content }
	        </div>
		)
	}
}

export default Main
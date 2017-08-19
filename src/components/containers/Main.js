import React, { Component } from 'react'
import Camps from './Camps'
import Nav from './Nav'
//import Footer from './Footer'  
import Footer from './Footer'
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
        	content = <div><Camps /></div>

        if (page == 'camp')
            content = <Camp slug={this.props.slug} />

        if (page == 'register')
            content = <Register />

        if (page == 'account')
            content = <Account />

		return(
			<div>
                <Nav />
                { content }
                <Footer />

	        </div>
		)
	}
}

export default Main
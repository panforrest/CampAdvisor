import React, { Component } from 'react' 
import { APIManager } from '../../utils'  //import { APIManager } from '../../utils/APIManager'

class Signup extends Component {
	constructor(){
		super()
		this.state = {
			visitor: {
				email: '',
				firstName: '',
				lastName: '',
                password: ''
			} 
		}
	}

	update(event){
        // console.log('updateProfile: ')
        event.preventDefault()
        // console.log(event.target.id+' == '+JSON.stringify(event.target.value))    //FORGOT target
        var updated = Object.assign({}, this.state.visitor)    //var updated = Object.assign({}, this.state)//[]
        updated[event.target.id] = event.target.value 
        this.setState({
        	visitor: updated
        })
        console.log(JSON.stringify(this.state.visitor))
	}

	register(event){
		event.preventDefault()
        // console.log('register: ')
        APIManager.post('/api/profile', this.state.visitor, (err, response) => {
            if (err) {
            	const msg = err.message || err
                alert(msg)
            	return
            }

            console.log('register: '+JSON.stringify(response))//console.log(JSON.stringify(response.result))
        })
	}

	render(){
		return(
			<div>
			    <h2>Sign up</h2>
                <input onChange={this.update.bind(this)} type='text' id='email' placeholder='Email' /><br />
                <input onChange={this.update.bind(this)} type='text' id='firstName' placeholder='First Name' /><br />
                <input onChange={this.update.bind(this)} type='text' id='lastName' placeholder='Last Name' /><br />
                <input onChange={this.update.bind(this)} type='text' id='password' placeholder='Password' /><br />

                <button onClick={this.register.bind(this)}>Submit</button>
			</div>
		)
	}

}

export default Signup
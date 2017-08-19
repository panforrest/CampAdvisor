import React, { Component } from 'react' 
import { APIManager } from '../../utils'  
import actions from '../../actions'
import { connect } from 'react-redux'

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

    login(event){
        // event.preventDefault()
        // APIManager.post('/account/login', this.state.visitor, (err, response) => {
        //     if (err) {
        //         const msg = err.message || err
        //         // console.log(msg)
        //         alert(msg)
        //         return
        //     }

        //     console.log(JSON.stringify(response))
        //     var result = response.profile
        //     this.props.currentUserReceived(result)
        // })
        this.props.onLogin(this.state.visitor)
    }

    register(event){
        // event.preventDefault()
        // // console.log('register: ')
        // APIManager.post('/account/register', this.state.visitor, (err, response) => {
        //     if (err) {
        //         const msg = err.message || err
        //         alert(msg)
        //         return
        //     }

        //     console.log('register: '+JSON.stringify(response))//console.log(JSON.stringify(response.result))
        //     var result = response.profile //var result = response.result
        //     this.props.profileCreated(result)//this.state.profileCreated(result)
        // })
        this.props.onRegister(this.state.visitor)
    }

	render(){
		return(
			<div>
                {(this.props.currentUser != null) ? <h2> Welcome! { this.props.currentUser.email } { this.props.currentUser.firstName } { this.props.currentUser.lastName } </h2> : 
                <div>
                    <h2>Sign up</h2>
                    <input onChange={this.update.bind(this)} type='text' id='email' placeholder='Email' /><br />
                    <input onChange={this.update.bind(this)} type='text' id='firstName' placeholder='First Name' /><br />
                    <input onChange={this.update.bind(this)} type='text' id='lastName' placeholder='Last Name' /><br />
                    <input onChange={this.update.bind(this)} type='text' id='password' placeholder='Password' /><br />

                    <button onClick={this.register.bind(this)}>Submit</button>

                    <h2>Log in</h2>
                    <input onChange={this.update.bind(this)} type='text' id='email' placeholder='Email' /><br />
                    <input onChange={this.update.bind(this)} type='text' id='password' placeholder='Password' /><br />

                    <button onClick={this.login.bind(this)}>Submit</button>
            
                </div> 

                }

			 </div>
		)
	}

}

const stateToProps = (state) => {
    return {
        profile: state.profile.user,
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Signup)
import React, { Component } from 'react'
import { Signup } from '../presentation'
import { APIManager } from '../../utils' 
import actions from '../../actions'
import { connect } from 'react-redux'
import { Nav } from '../containers'

class Register extends Component {
    componentDidMount(){
        // console.log('componentDidMount: ')
        APIManager.get('/account/currentuser', null, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }
            console.log('Admin.js: ', JSON.stringify(response.profile))
            this.props.currentUserReceived(response.profile)
        })
    } 

    register(visitor){
        APIManager.post('/account/register', visitor, (err, response) => {
            if (err) {
             const msg = err.message || err
                alert(msg)
             return
            }

            // console.log('register: '+JSON.stringify(response))
            // this.props.profileCreated(response.profile)
    		console.log('PROFILE CREATED:'+JSON.stringify(response))
    		window.location.href = '/account'
        })
    }

    login(credentials){
        APIManager.post('/account/login', credentials, (err, response) => {
            if (err) {
                const msg = err.message || err
                // console.log(msg)
                alert(msg)
                return
            }

            // console.log(JSON.stringify(response))
            this.props.currentUserReceived(response.profile)
    		console.log('USER LOGGED IN: '+JSON.stringify(response))
    		window.location.href = '/account'
        })
    }

	render(){
		return(
            <div>
                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                {(this.props.currentUser != null) ? <h2> Welcome! { this.props.currentUser.firstName } { this.props.currentUser.lastName } </h2> :  

                                    <div>
                                        
                                        <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </section>            
            </div>
        )
	}

}

const stateToProps = (state) => {
    return {
        // profiles: state.profile.list,
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        //profilesReceived: (profiles) => disptach(actions.profilesReceived(profiles)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
        // bugCreated: (bug) => dispatch(actions.bugCreated(bug)),
        // trackCreated: (track) => dispatch(actions.trackCreated(track))

    }
}

export default connect(stateToProps, dispatchToProps)(Register)
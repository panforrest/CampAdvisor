import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import Signup from './Signup'
import { APIManager } from '../../utils'

class Admin extends Component {

    componentDidMount(){
        APIManager.get('/account/currentuser', null, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }
            console.log('Admin.js: '+JSON.stringify(response.profile)) 
            this.props.currentUserReceived(response.profile)
        })

        
    }

    render(){
    	return(
    		<div>
                {(this.props.currentUser != null) ? <h2>Welcome, {this.props.currentUser.email}</h2> : 

                    <Signup />

                }   
    		</div>
    	)
    }
}

const stateToProps = (state) => {
    return {
        profiles: state.profile.list,
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        // currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)
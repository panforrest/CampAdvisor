import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'

class Admin extends Component {

    // login(event){
    //     event.preventDefault()
    //     APIManager.post('/account/login', this.state.visitor, (err, response) => {
    //         if (err) {
    //             const msg = err.message || err
    //             // console.log(msg)
    //             alert(msg)
    //             return
    //         }

    //         console.log(JSON.stringify(response))
    //         var result = response.profile
    //         this.props.currentUserReceived(result)
    //     })
    // }

    render(){
    	return(
    		<div>
                {(this.props.currentUser != null) ? <h2>Welcome, {this.props.currentUser.email}</h2> : 

                    <h2>User is not logged in. </h2>

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
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)
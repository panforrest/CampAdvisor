import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Profiles extends Component {
    constructor(){
    	super()  
    	this.state = {
    		profiles: []
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
            // this.setState({
            // 	profiles: results  //profile: response
            // })
            this.props.profilesReceived(results)

         })
    }

	render(){
        var list = this.props.profile.map((profile, i) => {
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

const stateToProps = (state) => {  
    return {
        profile: state.profile.list   
    }
}

const dispatchToProps = (dispatch) => {  
    return {
        //profileReceived: (profiles) => this.props.actions.profileReceived(profiles)
        profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles))
    }
}

export default connect(stateToProps, dispatchToProps)(Profiles)
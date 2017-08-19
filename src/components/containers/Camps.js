import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Camps extends Component {

	constructor(){
		super()
		this.state = {
			camps: []
		}
	}

	componentDidMount(){
		APIManager.get('/api/camp', null, (err, response) => {
			if (err) {
				const msg = err.message || err
				alert(msg)
				return
			}

			// console.log(JSON.stringify(response.results))
			var results = response.results
			this.props.campsReceived(results)
		})
	}

	render(){
        const camps = this.props.camps.map((camp, i) => {
        	return(
                <li key={i}>{camp.title}, {camp.description}, {camp.country}, {camp.url}</li>
        	)
        })

		return(
			<div>
                This is Camps List:
               
                    {camps}
                
            </div>    
		)
	}
}

const stateToProps = (state) => {
	return {
        camps: state.camp.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
        campsReceived: (camps) => dispatch(actions.campsReceived(camps))

	}
}

export default connect(stateToProps, dispatchToProps)(Camps)
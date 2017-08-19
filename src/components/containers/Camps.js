import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Camps extends Component {

	constructor(context, props){
		super(context, props)
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
        var camps = this.props.camps.map((camp, i) => {
        	return(
                <li key={camp._id}><a href={'/camp/'+camp.slug}>{camp.title}</a></li>
        	)
        })

		return(
			<div>
                <h2>Camp List</h2>
                  <ol>
                    {camps}
                  </ol>
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
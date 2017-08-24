import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'
import CampPreview from './CampPreview'
import Admin from './Admin'

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
        var campList = this.props.camps.map((camp, i) => {
        	return <CampPreview key={camp._id} camp={camp} />
        })

    	return(
    		<div className="container clearifx">
                
                <div className="col_three_fifth bothsidebar nobottommargin">
                    <div className="fancy-title title-border">
                        <h3>CampAdvisor's Camping Review</h3>
                    </div>

                    <div id="posts" className="events small-thumbs">
                        {campList}
                    </div>    
                </div>
                <div className="col_one_fifth bothsidebar nobottommargin">
                    <Admin />
                </div>    
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
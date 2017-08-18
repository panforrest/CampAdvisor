import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Reviews extends Component {

	constructor(){
		super()
		this.state = {
			reviews: []
		}
	}

	componentDidMount(){
		APIManager.get('/api/review', null, (err, response) => {
			if (err) {
				const msg = err.message || err
				alert(msg)
				return
			}

			console.log(JSON.stringify(response.results))
			var results = response.results
			// this.setState({
			// 	reviews: results
			// })
			this.props.reviewsReceived(results)
		})
	}

	render(){
        const reviews = this.props.reviews.map((review, i) => {
        	return(
                <li key={i}>{review.text}</li>
        	)
        })

		return(
			<div>
                This is Reviews List:
               
                    {reviews}
                
            </div>    
		)
	}
}

const stateToProps = (state) => {
	return {
        reviews: state.review.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
        reviewsReceived: (reviews) => dispatch(actions.reviewsReceived(reviews))

	}
}

export default connect(stateToProps, dispatchToProps)(Reviews)
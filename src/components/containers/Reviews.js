import React, { Component } from 'react'
import { APIManager } from '../../utils'

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
			this.setState({
				reviews: results
			})
		})
	}

	render(){
        const reviews = this.state.reviews.map((review, i) => {
        	return(
                <li key={review.id}>{review.text}</li>
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

export default Reviews
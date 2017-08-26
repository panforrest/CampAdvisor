import React, { Component } from 'react'
import {APIManager, DateUtils} from '../../utils' 
import { Nav } from '../containers'
import actions from '../../actions'
import { connect } from 'react-redux'
import Time from 'react-time'

class Camp extends Component {
    constructor(){
    	super()
    	this.state = {
    		camp: {
                title:''
    		},
            review: {
                text:'',
                // profile:''
            }
    	}
    }

	componentDidMount(){
        var _this = this
        APIManager.get('/api/camp?slug='+this.props.slug, null, (err, response) => {	
        	if (err){
        		const msg = err.message || err
        		alert(msg)
        		return
        	}
        	console.log(JSON.stringify(response.results))  
        	var camps = response.results
        	this.props.campsReceived(camps)
            _this.fetchPosts()

        })
	}

    fetchPosts(){
        console.log('fetchPosts: ')
        console.log(JSON.stringify(this.props.camp._id))
        if (this.props.camp._id == null){
            return
        }

        var id = this.props.camp._id
        APIManager.get('/api/review?camp='+id, null, (err, response) => {
            if (err){
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log(JSON.stringify(response.results))
            this.props.reviewsReceived(response.results)

        })
    } 

    updateReview(event){
        event.preventDefault()
        console.log(event.target.id+' == '+event.target.value)
        var updatedReview = Object.assign({}, this.state.review)
        updatedReview[event.target.id] = event.target.value
        var review = updatedReview
        this.setState({
            review: review
        })
        console.log('updatedReview: '+JSON.stringify(this.state.Review))
    }

    submitReview(event){
        event.preventDefault()
        var text = this.state.review.text
        if (text.length == 0) {
            alert('Please key in your review!')
            return   
        }
        if (this.props.currentUser == null) {
            alert('Please log in to contribute your review')
            return
        }

        var review = Object.assign({}, this.state.review)   
        console.log(JSON.stringify(this.props.camp._id))
        console.log(JSON.stringify(this.props.currentUser.id))
        review['camp'] = this.props.camp._id
        // review['profile'] = this.props.currentUser.id  //WHY NOT _id?
        review['profile'] = this.props.currentUser.firstName
        // review['profile'] = {
        //     email: this.props.currentUser.email,
        //     id: this.props.currentUser.id 
        // }

        APIManager.post('/api/review', review, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }
            this.props.reviewCreated(response.result)
            console.log('submitReview: '+JSON.stringify(response.result))

        })
        

    }   

	render(){

        var reviewList = this.props.reviews.map((review, i) => {
            // var timestamp = review.timestamp

            return (
                <a key={i} href="#" className="list-group-item">
                        <h4 className="list-group-item-heading">User {review.profile} 发表评论 {DateUtils.formattedDate(review.timestamp)}: </h4>
                        <p className="list-group-item-text">{review.text}</p>
                </a> 
            )
        })

        return(
            <div>


                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">
                                <h3>请在以下讨论社区发表您的评论：</h3>
                                <h4>Camp Name: {this.props.camp.title}</h4>
                                <p>Country: {this.props.camp.country}</p>
                                <p>Description: {this.props.camp.description}</p>
                                
                                <textarea onChange={this.updateReview.bind(this)} placeholder="Add your review here" id="text" className="form-control"></textarea><br /> 
                                
                                <button onClick={this.submitReview.bind(this)} className="btn btn-success">Submit Review</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />
                                
                                {reviewList}

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const stateToProps = (state) => {
    // var campsArray = state.camps.list
    var campsArray = state.camp.list

    return {
        camp: (campsArray.length == 0) ? {name:''} : campsArray[0],
        // reviews: state.review.list,
        reviews: state.review.list,
        currentUser: state.account.currentUser 
    }
}

const dispatchToProps = (dispatch) => {
    return {
        campsReceived: (camps) => dispatch(actions.campsReceived(camps)),
        reviewCreated: (review) => dispatch(actions.reviewCreated(review)),
        reviewsReceived: (reviews) => dispatch(actions.reviewsReceived(reviews))
    }
}

export default connect(stateToProps, dispatchToProps)(Camp)
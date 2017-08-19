import React, { Component } from 'react'
import {APIManager} from '../../utils' 
import { Nav } from '../containers'
import actions from '../../actions'
import { connect } from 'react-redux'

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
        var review = Object.assign({}, this.state.review)   
        console.log(JSON.stringify(this.props.camp._id))
        console.log(JSON.stringify(this.props.currentUser._id))
        review['camp'] = this.props.camp._id
        review['profile'] = this.props.currentUser._id

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
        return(
            <div>


                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                <h4>{this.props.camp.title}</h4>
                                
                                <textarea onChange={this.updateReview.bind(this)} placeholder="Add Your Review Here" id="text" className="form-control"></textarea><br /> 
                                
                                <button onClick={this.submitReview.bind(this)} className="btn btn-success">Add Review</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />

                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                </div>
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
        reviews: state.review.list,
        currentUser: state.account.currentUser 
    }
}

const dispatchToProps = (dispatch) => {
    return {
        campsReceived: (camps) => dispatch(actions.campsReceived(camps)),
        reviewCreated: (review) => dispatch(actions.reviewCreated(review))
    }
}

export default connect(stateToProps, dispatchToProps)(Camp)
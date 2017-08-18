import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import { Signup } from '../presentation'
import { APIManager } from '../../utils'

class Admin extends Component {

    constructor(){
        super()
        this.state = {
            review: {
                profile: '',
                camp: '',
                text: ''
            }
        }
    }

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

    register(visitor){
        APIManager.post('/account/register', visitor, (err, response) => {
            if (err) {
             const msg = err.message || err
                alert(msg)
             return
            }

            console.log('register: '+JSON.stringify(response))
            this.props.profileCreated(response.profile)
        })
    }

    login(credentials){
        APIManager.post('/account/login', credentials, (err, response) => {
            if (err) {
                const msg = err.message || err
                
                alert(msg)
                return
            }

            console.log(JSON.stringify(response))
            this.props.currentUserReceived(response.profile)
        })
    }

    updateReview(event){
        event.preventDefault()
        let updatedReview = Object.assign({}, this.state.review)
        updatedReview[event.target.id] = event.target.value  
        this.setState({
            review: updatedReview 
        }) 
        console.log('updatedReview: '+JSON.stringify(this.state.review))
    }

    submitReview(event){
        event.preventDefault()
        var review = this.state.review
        review['profile'] = this.props.currentUser.id

        APIManager.post('/api/review', review, (err, response) => {
            if (err){
                const msg = err.message || err
                alert(JSON.stringify(msg))
                return
            }
            console.log('submit: '+JSON.stringify(response.result))
            var result = response.result
            this.props.reviewCreated(review)
        })
    }

    render(){
    	return(
            <div>
                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> : 
                  <div>    
                    <h2>Welcome, {this.props.currentUser.email}</h2> 

                        <h3>Create Review</h3>
                        
                        <input onChange={this.updateReview.bind(this)} type="text" id="camp" placeholder="Camp" /><br />
                        <input onChange={this.updateReview.bind(this)} type="text" id="text" placeholder="Text" /><br />
                        <input onClick={this.submitReview.bind(this)} type="submit" value="Submit" />
                  </div>

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
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
        reviewCreated: (review) => dispatch(actions.reviewCreated(review))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)
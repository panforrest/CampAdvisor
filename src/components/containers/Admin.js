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
            },
            camp: {
                title: '',
                slug: ''
                // description: '',
                // country: '',
                // url: ''
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

    // updateReview(event){
    //     event.preventDefault()
    //     let updatedReview = Object.assign({}, this.state.review)
    //     updatedReview[event.target.id] = event.target.value  
    //     this.setState({
    //         review: updatedReview 
    //     }) 
    //     console.log('updatedReview: '+JSON.stringify(this.state.review))
    // }

    // submitReview(event){
    //     event.preventDefault()
    //     var review = this.state.review
    //     review['profile'] = this.props.currentUser.id

    //     APIManager.post('/api/review', review, (err, response) => {
    //         if (err){
    //             const msg = err.message || err
    //             alert(JSON.stringify(msg))
    //             return
    //         }
    //         console.log('submit: '+JSON.stringify(response.result))
    //         var result = response.result
    //         this.props.reviewCreated(review)
    //     })
    // }

    updateCamp(event){
        event.preventDefault()
        console.log('updateCamp: '+event.target.id+' == '+event.target.value)
        var updatedCamp = Object.assign({}, this.state.camp)
        updatedCamp[event.target.id] = event.target.value
        this.setState({
            camp: updatedCamp
        })
    }

    submitCamp(event){
        event.preventDefault()
        console.log('to submitCamp: '+JSON.stringify(this.state.camp))
        var camp = this.state.camp
        var title = camp.title
        var parts = title.split(' ')

        var slug = ''
        for (var i=0; i<parts.length; i++){
            var word = parts[i]
            slug += word
            if (i != parts.length-1)
                slug += '-'
        }

        // slug = slug.repalce('?', '-')
        slug = slug.replace('?', '-')
        camp['slug'] = slug
        console.log(JSON.stringify(camp))

        APIManager.post('/api/camp', camp, (err, response) => {
            if (err){
                const msg = err.message || err
                alert(JSON.stringify(msg))
                return
            }

            console.log('camp submitted: '+JSON.stringify(response.result))
            this.props.campCreated(response.result)
            window.location.href = '/camp/'+camp['slug']
        })
    }

    render(){
    	return(
            <div>
                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> : 
                  <div>    
                    <h2>Welcome! { this.props.currentUser.firstName } { this.props.currentUser.lastName }</h2> 

                        
                        <h3>Create Camp</h3>
                        <input onChange={this.updateCamp.bind(this)} type="text" id="title" placeholder="Camp Title" /><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="description" placeholder="Camp Description" /><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="country" placeholder="Camp Country" /><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="url" placeholder="Camp Url" /><br />
                        <input onClick={this.submitCamp.bind(this)} type="submit" value="Submit" />
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
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
        reviewCreated: (review) => dispatch(actions.reviewCreated(review)),
        campCreated: (camp) => dispatch(actions.campCreated(camp))
    }
}

export default connect(stateToProps, dispatchToProps)(Admin)
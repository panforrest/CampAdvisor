// <div className="3u 12u$(small)">
//                             <button className="button special small" style={{marginTop:12, marginLeft:12, width:90+'%'}} onClick={this.submitCamp.bind(this)} >Submit</button>                        
//                         </div>
// <input onClick={this.submitCamp.bind(this)} type="submit" value="Submit" /> 
import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import { Signup } from '../presentation'
import { APIManager } from '../../utils'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'

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
                slug: '',
                description: '',
                country: '',
                url: ''
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
        var email = visitor.email
        var firstName = visitor.firstName
        var lastName = visitor.lastName
        var password = visitor.password

        if (email.length == 0) {
            alert('Please fill in Email!')
            return              
        }

        
        if (firstName.length == 0) {
            alert('Please fill in First Name!')
            return              
        }

        
        if (lastName.length == 0) {
            alert('Please fill in Last Name!')
            return              
        }

        if (password.length == 0) {
            alert('Please fill in Password!')
            return              
        }

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
        var camp = this.state.camp
        var title = camp.title
        var description = camp.description
        var country = camp.country 
        var url = camp.url

        if (title.length == 0) {
            alert('Please fill in Camp Title!')
            return 
        }

        if (description.length == 0) {
            alert('Please fill in Camp Description!')
            return 
        }

        if (country.length == 0) {
            alert('Please fill in Camp Country!')
            return 
        }

        if (url.length == 0) {
            alert('Please fill in Camp Url!')
            return 
        }

        // console.log('to submitCamp: '+JSON.stringify(this.state.camp))
        // var camp = this.state.camp
        // var title = camp.title
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

    uploadImage(files){
        const image = files[0]

        const cloudName = 'hnejahtlt'
        const url ='https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'


        let timestamp = Date.now() / 1000
        const uploadPreset = 'ohhbo4mb'

        const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'Eclmz2Dy6ddNQAkj9VL07CDE7Cs'
        const signature = sha1(paramsStr)

        const params = {
            'api_key': '386581151724518',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        // console.log('uploadImage: ')
        APIManager.upload(url, image, params, (err, response) => {
            if (err) {
                console.log('UPLOAD ERROR: '+JSON.stringify(err))
                return
            }

            console.log('UPLOAD COMPLETE: '+JSON.stringify(response.body))

        })
    }

    render(){
    	return(
            <div>
                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> : 
                  <div>    
                    <h2>Welcome! { this.props.currentUser.firstName } </h2> 

                        
                        <h3>添加一个新的营地产品</h3>
                        <input onChange={this.updateCamp.bind(this)} type="text" id="title" placeholder="Camp Title" className="form-control" style={{marginTop:1, marginLeft:12, width:95+'%'}}/><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="description" placeholder="Camp Description" className="form-control" style={{marginTop:1, marginLeft:12, width:95+'%'}}/><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="country" placeholder="Camp Country" className="form-control" style={{marginTop:1, marginLeft:12, width:95+'%'}}/><br />
                        <input onChange={this.updateCamp.bind(this)} type="text" id="url" placeholder="Camp Url" className="form-control" style={{marginTop:1, marginLeft:12, width:95+'%'}}/><br />
                        <Dropzone onDrop={this.uploadImage.bind(this)}/>
                        <button onClick={this.submitCamp.bind(this)} className="btn btn-success">Submit New Camp</button><br />
                            
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
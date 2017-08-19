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
    		}
    	}
    }

	componentDidMount(){
        APIManager.get('/api/camp?slug='+this.props.slug, null, (err, response) => {	
        	if (err){
        		const msg = err.message || err
        		alert(msg)
        		return
        	}
        	console.log(JSON.stringify(response.results))  
        	var camps = response.results
        	this.props.campsReceived(camps)

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
                                <textarea placeholder="Add your review here" className="form-control"></textarea><br /> 
                                <button className="btn btn-success">Add Review</button><br />
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
        camp: (campsArray.length == 0) ? {name:''} : campsArray[0] 
    }
}

const dispatchToProps = (dispatch) => {
    return {
        campsReceived: (camps) => dispatch(actions.campsReceived(camps))
    }
}

export default connect(stateToProps, dispatchToProps)(Camp)
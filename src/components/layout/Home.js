import React, { Component } from 'react'
import { Profiles, Signup } from '../containers'

class Home extends Component {
	render(){
		return(
            <div>
                <div className="row">
                    <div className="col-md-3">
                        Left
                        <Profiles />
                    </div>

                    <div className="col-md-6">
                        Middle
                    </div>

                    <div className="col-md-3">
                        <Signup />
                    </div>
                    

                </div>
            </div>
		)
	}
}

export default Home
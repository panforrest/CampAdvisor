import React, { Component } from 'react'
import { Profiles } from '../containers'

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
                        Right
                    </div>
                    

                </div>
            </div>
		)
	}
}

export default Home
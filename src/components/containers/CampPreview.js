import React, { Component } from 'react'
import { DateUtils } from '../../utils'

class CampPreview extends Component {

    

	render(){

		return (

			<div className="entry clearfix">

                <div className="entry-image hidden-sm">
                    <a href={'/camp/'+this.props.camp.slug}>
                        <img src={this.props.camp.image}  />
                    </a>
                </div>
                
                <div className="entry-c">
                    <div className="entry-title">
                        <h2>
                            <a href={'/camp/'+this.props.camp.slug}>{this.props.camp.title}</a>
                        </h2>
                    </div>
                    <ul className="entry-meta clearfix">
                        
                        <li><a target="_blank" href={this.props.camp.url}><i className="icon-time"></i> {this.props.camp.url} </a></li>
                        <li><a href="#"><i className="icon-map-marker2"></i> {this.props.camp.country} </a></li>
                    </ul>
                    <hr style={{borderTop:'1px solid #ddd'}} />
                    <div className="entry-content">
                        <p>Description: {this.props.camp.description}</p>
                    
                    </div>
                </div>
            </div>

		)
	}
}

export default CampPreview
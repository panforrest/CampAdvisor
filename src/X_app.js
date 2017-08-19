import React, { Component } from 'react'
import ReactDom from 'react-dom'
// import { Home } from './components/layout' 
import { Main } from './components/layout'
import { Provider } from 'react-redux'
import store from './store' 

// class App extends Component {
// 	render() {
// 		return (
// 			<Provider store = {store.configureStore()}>
// 	            <div>

// 	                <Home />
// 	            </div>
//             </Provider> 
// 		)
// 	}
// } 

class App extends Component {
    constructor(props, context){
    	super(props, context)
		this.state = {
			page: 'home'
		}
    }

    comopnentWillMount(){
    	var path = widow.location.pathname.replace('/', '');

    	var page = 'home'
    	if (path.length){
            var parts = path.split('/')
            page = parts[0]
    	}

    	this.setState({
    		page: page
    	})
    }

	render() {
		return (
			<Provider store = {store.configureStore()}>
	            <div>

	                <Main page={this.state.page}/>
	            </div>
	        </Provider>    
		)
	}
} 

ReactDom.render(<App />, document.getElementById('root'))
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Home } from './components/layout' 
import { Provider } from 'react-redux'
import store from './store' 

class App extends Component {
	render() {
		return (
			<Provider store = {store.configureStore()}>
	            <div>

	                <Home />
	            </div>
            </Provider> 
		)
	}
} 

ReactDom.render(<App />, document.getElementById('root'))
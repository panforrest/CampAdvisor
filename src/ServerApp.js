import React, { Component } from 'react'
// import { Main } from './components/containers' 
import Main from './components/containers/Main' 
import store from './store'
import { Provider } from 'react-redux'


class App extends Component{

	render(){
		return(
                <Provider store={store}>
			        <Main page={this.props.page} />
			    </Provider>
		)
	}
} 

export default App
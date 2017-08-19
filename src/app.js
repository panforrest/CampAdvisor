//     render() {
//         return (
//             <Provider store = {store.configureStore()}>
//                 <div>

//                     <Main page={this.state.page} slug={this.state.slug}/>
//                 </div>
//             </Provider>    
//         )
//     }
// } 

// ReactDom.render(<App />, document.getElementById('root'))
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Home } from './components/layout'
import { Main } from './components/containers'
import { Provider } from 'react-redux'
import store from './store'

// class App extends Component {
// 	render() {
// 		return (
// 			<Provider store = {store.configureStore()}>
// 	            <div>

// 	                <Home />
// 	            </div>
// 	        </Provider>    
// 		)
// 	}
// } 

// ReactDom.render(<App />, document.getElementById('root'))

class App extends Component {
    constructor(props, context){
    	super(props, context)
		this.state = {
			page: 'home',
            slug: null
		}
    }

    componentWillMount(){  //comopnentWillMount(){
    	var pathname = window.location.pathname
        console.log(pathname)
        var path = pathname.replace('/', ''); 

    	var page = 'home'
    	var slug = null
    	if (path.length>0){
            var parts = path.split('/')
            page = parts[0]
            if (parts.length > 1)
            	slug = parts[1]
    	}

    	this.setState({
    		page: page,
    		slug: slug
    	})
        // console.log('state: '+JSON.stringify(this.state))
        // alert('state: '+JSON.stringify(this.state))
    }

    render() {
        return(
                <Main page={this.state.page} slug={this.state.slug}/>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 

    document.getElementById('app')
)
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import Home from './pages/Home';
import Settings from './pages/Settings/Settings';
import Alerts from './pages/Alerts/Alerts';
import History from './pages/History/History';
import Friends from './pages/Friends/Friends';
import Quickstart from './pages/Quickstart';
import './index.css';
import withSplashScreen from './components/splashScreen/withSplashScreen.js'

class App extends Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null
		};
	}

	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
		event.preventDefault();
		console.log('logged out');
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			console.log(response);
			if (response.status === 200) {
				// update the state
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			}
		});
	}

	render() {
		return (
			<div className="App">
				{this.state.loggedIn && (
					<div>
						<div className="main-view">
							<Switch>
								<Route exact path="/" component={() => <Home user={this.state.user} logout={this.logout}></Home>} />
								<Route exact path="/history" component={History} />
								<Route exact path="/alerts" component={Alerts} />
								<Route exact path="/settings" component={Settings} />
								<Route exact path="/friends" component={Friends} />
								<Route component={NoMatch} />
							</Switch>
						</div>
					</div>
				)}
				{!this.state.loggedIn && (
					<div>
						<div className="auth-wrapper" style={{ paddingTop: 40 }}>
							<Route exact path="/" component={() => <Home />} />
							<Route exact path="/alerts" component={Alerts} />
							<Route exact path="/quickstart" component={Quickstart} />
							<Route exact path="/history" component={History} />
							<Route exact path="/settings" component={Settings} />
							<Route exact path="/friends" component={Friends} />
							<Route exact path="/login" component={() => <LoginForm login={this.login} />} />
							<Route exact path="/signup" component={SignupForm} />
						</div>
					</div>
				)}
			</div>
		)
	}
}

//export default App;
export default withSplashScreen(App);
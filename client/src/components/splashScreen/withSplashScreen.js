import React, {Component} from 'react';
import './splash-screen.css';

function LoadingMessage() {
    console.log("loading message")
    return (
    <div className="splash-screen">
      <h1>sipSpot</h1>
      <p>Invite friends, track drinks, get home safe!</p>
      <div className="loading-dot">.</div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
    console.log( " with Splash Screen")
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
          setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 2000)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
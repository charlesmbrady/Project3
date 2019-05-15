import React, { Component } from 'react';
import './splash-screen.css';
import "../../../src/index.css";
import colorSuperSip from '../../images/colorSuperSip.gif';

function LoadingMessage () {
  console.log("loading message")
  return (
    <div className="splash-screen">
      <div id="title">sipSpot</div>
      <div className="loading-dot">.</div>
      <p className="splashscreen-text"><em>Spot helps you:</em><br /><br />&bull; remember your things,<br />&bull; track your drinks,<br />&bull; invite your friends,<br />&bull; and get home <em>safe!</em></p>
      <div>
        <img id="superSip" src={ colorSuperSip } alt="super sip the beer bottle" width="80%" />
      </div>
    </div>
  );
}

function withSplashScreen (WrappedComponent) {
  console.log(" with Splash Screen")
  return class extends Component {
    constructor (props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount () {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 3000)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render () {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <WrappedComponent { ...this.props } />;
    }
  };
}

export default withSplashScreen;
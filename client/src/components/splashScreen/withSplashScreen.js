import React, { Component } from 'react';
import './splash-screen.css';
import "../../../src/index.css";
import colorSuperSip from '../../images/colorSuperSip.gif';

function LoadingMessage () {
  console.log("loading message")
  return (
    <div className="splash-screen">
      <div className="topbar topbar-splash">&nbsp;</div>
      <div id="splash-title">sipSpot</div>
      <div className="loading-dot">.</div>
      <p className="splashscreen-header"><em>Spot helps you:</em></p>
      <div className="spot-and-splash-text">
        <section className="superSip-container">
          <img id="superSip-splashscreen" src={ colorSuperSip } alt="super sip the beer bottle" width="80%" />
        </section>
        <section className="splashscreen-list-container">
          <ul className="splashscreen-list">
            <li>remember your things</li>
            <li>track your drinks</li>
            <li>invite your friends</li>
            <li>get home <em>safe!</em></li>
          </ul>
        </section>
      </div>
      <div className="bottombar bottombar-splash">&nbsp;</div>
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
        }, 5000)
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
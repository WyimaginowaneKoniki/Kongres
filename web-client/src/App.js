import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/home";
import Agenda from "./pages/agenda";
import Speakers from "./pages/speakers";
import About from "./pages/about";
import Contact from "./pages/contact";
import NavigationNotLogged from "./components/NavigationNotLogged";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Regulations from "./pages/regulations";
import CookiesPolicy from "./pages/cookies-policy";
import PrivacyPolicy from "./pages/privacy-policy";
import AddingWork from "./pages/adding-work";
import SignUpReviewer from "./pages/signup-reviewer";
import SignUpParticipant from "./pages/signup-participant";
import ScientificWorks from "./pages/scientific-works";
import MyReviews from "./pages/my-reviews";
import MyProfile from "./pages/my-profile";
import SignInReviewer from "./pages/signin-reviewer";
import SignInParticipant from "./pages/signin-participant";
import WorkView from "./pages/work-view";
import Error404 from "./pages/error-404";
import axios from "axios";
import { URL } from "./Constants";

function App() {
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
    var token = localStorage.getItem("jwt");

    if (!token) setUserInfo(null);
    else {
      axios
        .get(`${URL}/api/User`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          setUserInfo(resp.data);
        });
        
    }
  }, []);

  const SecuredRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => {
          if (userInfo) {
            return <Component {...rest} {...props} userInfo={userInfo}/>
          } 
          else if(!localStorage.getItem("jwt")) {
            return <Redirect to='/signin-participant'/>
          }
        }
      } />
    )
  }

  const SecuredRouteReviewer = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => {
          if (userInfo && userInfo.role === "Reviewer") {
            return <Component {...rest} {...props} />
          } 
          else if(!localStorage.getItem("jwt") || (userInfo && userInfo.role !== "Reviewer")) {
            return <Redirect to='/signin-reviewer'/>
          }
        }
      } />
    )
  }

  const SecuredRouteParticipant = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => {
          if (userInfo && userInfo.role === "Participant") {
            return <Component {...rest} {...props} />
          } 
          else if(!localStorage.getItem("jwt") || (userInfo && userInfo.role !== "Participant")) {
            return <Redirect to='/signin-participant'/>
          }
        }
      } />
    )
  }

  return (
    <Router>
      <div className="App">
        {userInfo ? (
          <Navigation userInfo={userInfo} />
        ) : (
          <NavigationNotLogged />
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/agenda" component={Agenda} />
          <Route path="/speakers" component={Speakers} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/regulations" component={Regulations} />
          <Route path="/cookies-policy" component={CookiesPolicy} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/signup-reviewer" component={SignUpReviewer} />
          <Route path="/signup-participant" component={SignUpParticipant} />
          <Route path="/signin-reviewer" component={SignInReviewer} />
          <Route path="/signin-participant" component={SignInParticipant} />
          <SecuredRoute path="/my-profile" component={MyProfile}/>
          <SecuredRoute exact path="/scientific-works" component={ScientificWorks} />
          <SecuredRoute path="/work-view" component={WorkView} />
          {/* Participant */}
          <SecuredRouteParticipant path="/adding-work" component={AddingWork} />
          {/* Reviewer */}
          <SecuredRouteReviewer path="/my-reviews" component={MyReviews}/>
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

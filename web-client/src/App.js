// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/home';
import Agenda from './pages/agenda';
import Speakers from './pages/speakers';
import About from './pages/about';
import Contact from './pages/contact';
import NavigationNotLogged from './components/NavigationNotLogged';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Regulations from './pages/regulations';
import CookiesPolicy from './pages/cookies-policy';
import PrivacyPolicy from './pages/privacy-policy';
import AddingWork from './pages/adding-work';
import SignUpReviewer from './pages/signup-reviewer';
import SignUpParticipant from './pages/signup-participant';
import ScientificWorks from './pages/scientific-works';
import AcceptedScientificWork from './pages/accepted-scientific-work';
import MyReviews from './pages/my-reviews';
import MyProfile from './pages/my-profile';
import SignInReviewer from './pages/signin-reviewer';
import SignInParticipant from './pages/signin-participant';
import WorkView from './pages/work-view';
import Error404 from './pages/error-404';

const authentication = {
  isLoggedIn:false,
  onAuthentication(){
    this.isLoggedIn= true;
  },
  getLogInStatus(){
    return this.isLoggedIn;
  }
}

const user = "Participant"

function SecuredRoute(props){
  return(
    <Route path={props.path} render={data=>authentication.getLogInStatus()? (
      <props.component {...data}></props.component>):
      (<Redirect to={{pathname:'/signin-participant'}}></Redirect>)}></Route>
  )
}

function SecuredRouteParticipant(props){
  return(
    <Route path={props.path} render={data=>authentication.getLogInStatus() && user === "Participant"? (
      <props.component {...data}></props.component>):
      (<Redirect to={{pathname:'/signin-participant'}}></Redirect>)}></Route>
  )
}

function SecuredRouteReviewer(props){
  return(
    <Route path={props.path} render={data=>authentication.getLogInStatus() && user === "Reviewer"? (
      <props.component {...data}></props.component>):
      (<Redirect to={{pathname:'/signin-reviewer'}}></Redirect>)}></Route>
  )
}

function log()
{
  console.log(localStorage.getItem("jwt"))
  if(localStorage.getItem("jwt") !== null)
    authentication.onAuthentication();
}

function App() {
  log();
    return (
      <Router>
        <div className="App">
        {localStorage.getItem("jwt") !== null ? <Navigation/> : <NavigationNotLogged /> }
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
            <SecuredRoute path="/my-profile" component={MyProfile} />
            <SecuredRoute path="/scientific-works" component={ScientificWorks} />
            <SecuredRoute path="/work-view" component={WorkView} />
            {/* Participant */}
            <SecuredRouteParticipant path="/adding-work" component={AddingWork} />
            {/* Reviewer */}
            <SecuredRouteReviewer path="/my-reviews" component={MyReviews} />
            {/* Do usuniecia potem */}
            <SecuredRoute path="/accepted-scientific-work" component={AcceptedScientificWork} />
            <Route path="*" component={Error404} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
}

export default App;

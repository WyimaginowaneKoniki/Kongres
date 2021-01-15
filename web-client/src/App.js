import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/home';
import Agenda from './pages/agenda';
import Speakers from './pages/speakers';
import About from './pages/about';
import Contact from './pages/contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Regulations from './pages/regulations';
import CookiesPolicy from './pages/cookies-policy';
import PrivacyPolicy from './pages/privacy-policy';
import AddingWork from './pages/adding-work';
import SignUpReviewer from './pages/signup-reviewer';
import SignUpParticipant from './pages/signup-participant';
import ScientificWorks from './pages/scientific-works';
import MyReviews from './pages/my-reviews';
import MyProfile from './pages/my-profile';
import SignInReviewer from './pages/signin-reviewer';
import SignInParticipant from './pages/signin-participant';
import WorkView from './pages/work-view';

function App() {
    return (
      <Router>
        <div className="App">
          <Navigation/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/agenda" component={Agenda} />
            <Route path="/speakers" component={Speakers} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/regulations" component={Regulations} />
            <Route path="/cookies-policy" component={CookiesPolicy} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/adding-work" component={AddingWork} />
            <Route path="/signup-reviewer" component={SignUpReviewer} />
            <Route path="/signup-participant" component={SignUpParticipant} />
            <Route path="/scientific-works" component={ScientificWorks} />
            <Route path="/my-reviews" component={MyReviews} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/signin-reviewer" component={SignInReviewer} />
            <Route path="/signin-participant" component={SignInParticipant} />
            <Route path="/work-view" component={WorkView} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
}

export default App;

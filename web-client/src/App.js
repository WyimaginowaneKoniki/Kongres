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
import AddingWork from './pages/Users/Participant/adding-work';
import SignUpReviewer from './pages/Users/Reviewer/signup-reviewer';
import SignUpParticipant from './pages/Users/Participant/signup-participant';
import ScientificWorks from './pages/ScientificWorks/scientific-works';
import MyReviews from './pages/Users/Reviewer/my-reviews';
import MyProfile from './pages/Users/my-profile';
import SignInReviewer from './pages/Users/Reviewer/signin-reviewer';
import SignInParticipant from './pages/Users/Participant/signin-participant';
import WorkView from './pages/ScientificWorks/work-view';
import PhotoGallery from './pages/photo-gallery';
import { LINKS } from './Constants';

function App() {
    return (
      <Router>
        <div className="App">
          <Navigation/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path={LINKS.AGENDA} component={Agenda} />
            <Route path={LINKS.SPEAKERS} component={Speakers} />
            <Route path={LINKS.ABOUT} component={About} />
            <Route path={LINKS.CONTACT} component={Contact} />
            <Route path={LINKS.REGULATIONS} component={Regulations} />
            <Route path={LINKS.COOKIES} component={CookiesPolicy} />
            <Route path={LINKS.PRIVACY} component={PrivacyPolicy} />
            <Route path={LINKS.GALLERY} component={PhotoGallery} />

            <Route path={[LINKS.PROFILE, LINKS.PARTICIPANT, LINKS.REVIEWER]} exact component={MyProfile} />

            {/* Participant */}
            <Route path={`${LINKS.PARTICIPANT_SIGN_UP}`} component={SignUpParticipant} />
            <Route path={`${LINKS.PARTICIPANT_LOGIN}`} component={SignInParticipant} />
            <Route path={`${LINKS.ADDING_WORK}`} component={AddingWork} />
            
            {/* Reviewer */}
            <Route path={`${LINKS.REVIEWER_SIGN_UP}`} component={SignUpReviewer} />
            <Route path={`${LINKS.REVIEWER_LOGIN}`} component={SignInReviewer} />
            <Route path={`${LINKS.REVIEWS}`} component={MyReviews} />
            
            {/* Scientific works */}
            <Route path={LINKS.WORKS} exact component={ScientificWorks} />
            <Route path={LINKS.WORKS} component={WorkView} />
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
}

export default App;

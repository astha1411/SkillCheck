import React from "react";

import { Container } from "react-bootstrap";
import HeaderWithRouter from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ProfilePage from "./Components/ProfilePage";
import HomePage from "./Components/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Openings from "./Components/Openings";
import Applications from "./Components/Applications";
import Notifications from "./Components/Notifications";
const App = () => {
  return (
    <>
      <Router>
        <HeaderWithRouter />
        <main className="py-3 bg-light contextual">
          <Container>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/Profile" component={ProfilePage} />
              <Route path="/Jobs" component={Openings} />
              <Route path="/Applications" component={Applications} />
              <Route path="/Notifications" component={Notifications} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};
export default App;

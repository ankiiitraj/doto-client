import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Error from "./components/error/Error.jsx";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import 'react-notifications/lib/notifications.css';
import Leaderboard from "./components/main/leaderboard/Leaderboard";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import {   NotificationManager, NotificationContainer } from "react-notifications";

function App() {
  const [user, setUserDetail] = useState({ name: window.localStorage.getItem('name') ||"user", email: window.localStorage.getItem('email') || "N/A" });
  const [done, setDone] = useState([]);
  const [messsage, updateMessage] = useState(`Loading Data . . . 🚶‍♂️`);
  const history = useHistory();

  const signin = (success) => {
    if (success) {
      const name = window.localStorage.getItem("name");
      const email = window.localStorage.getItem("email");
      setUserDetail({ name: name, email: email });
      fetchDone();
    } else {
      history.push("/error");
    }
  };
  const fetchDone = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_ENDPOINT || ''}/done`, {
        headers: {
          'authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then((result) => {
        setDone([...result.data.result.done]);
        updateMessage('👨🏼‍💻');
      })
      .catch((err) => {
        NotificationManager.warning("Loading data failed, please signin again!🧍‍♂️", "Woops");
        window.localStorage.clear();
        updateMessage("");
      });
  }

  const location = useLocation();
  useEffect(() => {
    if(window.localStorage.getItem('token') && location.pathname === "/"){
      fetchDone();
    }else if(window.localStorage.getItem('token') && location.pathname !== "/"){
      setDone([]);
      updateMessage(`Loading Data . . . 🚶‍♂️`);
    }
  }, [location])

  const signout = () => {
    setUserDetail({name: 'user', email: ''});
  } 
  return (
    <div className="App">
      <Nav signout={signout} user={user} />
      <Switch>
        <ProtectedRoute
          exact
          user={user}
          signin={signin}
          done={done}
          messsage={messsage}
          path="/"
          component={Main}
        />
        <Route exact path='/leaderboard' component={Leaderboard} />
        <Route exact path='/about' component={About} />
        <Route path="/" component={Error} />
      </Switch>
      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App;

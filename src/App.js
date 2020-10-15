import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Error from "./components/error/Error.jsx";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import 'react-notifications/lib/notifications.css';

function App() {
  const [user, setUserDetail] = useState({ name: window.localStorage.getItem('name') ||"user", email: window.localStorage.getItem('email') || "N/A" });
  const [done, setDone] = useState([]);
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
      .get("/api/done", {
        headers: {
          'authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      })
      .then((result) => {
        setDone([...result.data.result.done]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if(window.localStorage.getItem('token')){
      fetchDone();
    }
  }, [])

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
          path="/"
          component={Main}
        />
        <Route path="/" component={Error} />
      </Switch>
    </div>
  );
}

export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Error from "./components/error/Error.jsx";
import Nav from "./components/nav/Nav";
import Main from "./components/main/Main";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import "./react-notification.css"
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import {   NotificationManager, NotificationContainer } from "react-notifications";
import Lists from "./components/lists/lists";

function App() {
  const [user, setUserDetail] = useState({ name: window.localStorage.getItem('name') ||"user", email: window.localStorage.getItem('email') || "N/A" });
  const [done, setDone] = useState([]);
  const [dataArrived, updateArrival] = useState(false);
  const [message, updateMessage] = useState(`🟣 🟣 🟣`);
  const [which, updateWhich] = useState(window.localStorage.getItem('which') || "done");
  const history = useHistory();

  const handleWhichUpdate = (which) =>{
    window.localStorage.setItem("which", which);
    updateWhich(which);
  }

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
        setDone(which === 'done' ? [...result.data.result.done] : [...result.data.result.doneKartikCP]);
        updateMessage('👨🏼‍💻');
        updateArrival(true);
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
      updateMessage(`🟣 🟣 🟣`);
      updateArrival(false);
    }
  // eslint-disable-next-line
  }, [location])

  const signout = () => {
    setUserDetail({name: 'user', email: ''});
  } 
  
  function renderNav(){
    if(user.name !== "user"){
      return <Nav signout={signout} user={user} />
    }
  }

  return (
    <div className="App">
      <div className="main">
        {renderNav()}
        <Switch>
          <ProtectedRoute
            exact
            user={user}
            signin={signin}
            done={done}
            message={message}
            dataArrived={dataArrived}
            which={which}
            path="/"
            component={Main}
          />
          <Route exact path='/about' component={About} />
          <Route exact path='/lists'><Lists updateWhich={handleWhichUpdate} which={which} /></Route>
          <Route path="/" component={Error} />
        </Switch>
        <NotificationContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;

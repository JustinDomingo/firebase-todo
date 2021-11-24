import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./Header"
import Homepage from "./Homepage"
import Login from "./Login"
import Register from "./Register"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginContext from "./LoginContext"

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("user")))
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")))

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData }}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Homepage /> : <Register />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  )
}

export default App

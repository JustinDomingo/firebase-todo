import React from "react"
import { useState, useContext } from "react"
import { useHistory } from "react-router"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import LoginContext from "./LoginContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [areErrors, setAreErrors] = useState(false)
  const history = useHistory()
  const { setLoggedIn, setUserData } = useContext(LoginContext)
  const auth = getAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          jwt: userCredential.user.accessToken,
        }
        localStorage.setItem("user", JSON.stringify(user))
        setLoggedIn(true)
        setUserData(user)
        history.push("/")
      })
      .catch((error) => {
        setAreErrors(true)
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  return (
    <div className="container text-center">
      <form onSubmit={handleSubmit}>
        <div className="m-2 h2 font-light">Email</div>
        <input className="w-50 h2 font-light border rounded shadow-sm" onChange={(e) => setEmail(e.target.value)}></input>
        <div className="m-2 h2 font-light">Password</div>
        <input className="w-50 h2 font-light border rounded shadow-sm" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <div>
          <button className="bg-success m-4 w-50 rounded border h2 font-light text-white shadow-sm">Login</button>
        </div>
        {areErrors && <div className="h2 font-light text-danger">Invalid Username/Password</div>}
      </form>
      <hr></hr>
    </div>
  )
}

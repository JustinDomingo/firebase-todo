import React from "react"
import { useState, useContext } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"
import LoginContext from "./LoginContext"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [areErrors, setAreErrors] = useState(false)
  const { setLoggedIn, setUserData } = useContext(LoginContext)
  const auth = getAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          jwt: userCredential.user.accessToken,
        }
        localStorage.setItem("user", JSON.stringify(user))
        setLoggedIn(true)
        setUserData(user)
      })
      .catch((error) => {
        setAreErrors(true)
        console.log(error.code)
      })
  }

  return (
    <div className="container text-center">
      {areErrors && <div className="h2 font-light text-danger py-2">Invalid Username/Password</div>}
      <form onSubmit={handleSubmit}>
        <div className="m-2 h2 font-light">Email</div>
        <input className="w-50 h2 font-light border rounded shadow-sm" onChange={(e) => setEmail(e.target.value)}></input>
        <div className="m-2 h2 font-light">Password</div>
        <input className="w-50 h2 font-light border rounded shadow-sm" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <div>
          <button className="bg-success m-4 w-50 rounded border h2 font-light text-white shadow-sm">Register</button>
        </div>
      </form>
      <div className="h2 font-light">
        Already have an account? Click <Link to="/login">here</Link>
      </div>
      <hr></hr>
    </div>
  )
}

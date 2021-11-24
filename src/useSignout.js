import LoginContext from "./LoginContext"
import { useContext, useState } from "react"
import { signOut, getAuth } from "firebase/auth"

export default function useSignout() {
  const auth = getAuth()
  const [error, setError] = useState("")
  const { setLoggedIn } = useContext(LoginContext)

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user")
        setLoggedIn(false)
      })
      .catch((err) => {
        setError(err)
      })
  }

  return { logout, error }
}

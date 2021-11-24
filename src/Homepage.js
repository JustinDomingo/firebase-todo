import "./App.css"
import { useState, useEffect, useRef, useContext } from "react"
import useSignout from "./useSignout"
import LoginContext from "./LoginContext"
import { db } from "./firebase/config"
import { collection, onSnapshot, addDoc, query, where } from "firebase/firestore"
import "bootstrap/dist/css/bootstrap.min.css"
import Item from "./Item"

export default function Homepage() {
  const [body, setBody] = useState("")
  const [data, setData] = useState([])
  const { userData } = useContext(LoginContext)
  const { logout } = useSignout()
  const [isLoading, setIsLoading] = useState(true)
  const firstRender = useRef(true)
  const colRef = collection(db, "items")

  const q = query(colRef, where("author", "==", userData.email))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push({ ...item.data(), id: item.id })
      })
      setData(arr)
    })
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setIsLoading(false)
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (body == "") {
      return
    }
    addDoc(colRef, {
      item: body,
      author: userData.email,
    })
    setBody("")
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="my-5">
      <div className="text-center">
        <div>
          <h1 className="test-two font-light mt-4">
            {userData && userData.email}{" "}
            <button onClick={handleLogout} className="mx-5 test-two font-light logout border position-relative">
              Logout
            </button>
          </h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setBody(e.target.value)
              }}
              className="border w-25 rounded test font-light h-100 shadow-sm m-4"
              value={body}
            ></input>
            <button className="test h-100 rounded border bg-success text-white">Create</button>
          </form>
        </div>
      </div>
      <div className="todo-container">
        {isLoading ? (
          <div className="container p-5 w-50 display-4 text-center mt-4">Loading...</div>
        ) : data && data.length ? (
          data.map((doc) => {
            return <Item doc={doc} key={doc.id} />
          })
        ) : (
          <div className="container p-5 w-50 display-4 text-center mt-4">Nothing To Do...</div>
        )}
      </div>
      <hr className="my-5"></hr>
    </div>
  )
}

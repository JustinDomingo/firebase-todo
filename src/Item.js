import React from "react"
import "./App.css"
import { useState } from "react"
import { db } from "./firebase/config"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Item(props) {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(props.doc.item)

  const handleConfirm = () => {
    console.log("Test")
    const docRef = doc(db, "items", props.doc.id)
    setEdit(false)
    updateDoc(docRef, {
      item: text,
    })
  }

  const handleDelete = (e) => {
    let id = e.target.getAttribute("data-id")
    deleteDoc(doc(db, "items", id))
    e.preventDefault()
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setText(props.doc.item)
    setEdit(false)
  }

  const handleKeyUp = (e) => {
    if (e.key == "Enter") {
      const docRef = doc(db, "items", props.doc.id)
      setEdit(false)
      updateDoc(docRef, {
        item: text,
      })
    }
  }

  return (
    <div className="container about p-4 rounded my-4 shadow-sm" key={props.doc.id}>
      <div className="row">
        {edit ? <input onKeyUp={handleKeyUp} className="col rounded border test font-light" onChange={(e) => setText(e.target.value)} value={text}></input> : <div className="test font-light col">{props.doc.item}</div>}
        {edit ? (
          <button className="test p-1 h-100 rounded border bg-success text-white text-right col-2 mx-2" data-id={`${props.doc.id}`} onClick={handleConfirm}>
            Update
          </button>
        ) : (
          <button className=" h-100 rounded border bg-secondary text-white text-right col-2 col-md-3 col-sm-2 col-xs-1 mx-2 test" data-id={`${props.doc.id}`} onClick={handleEdit}>
            Edit
          </button>
        )}
        {edit ? (
          <button className="test h-100 rounded border bg-danger text-white text-right col-2 col-md-3 col-sm-2 col-xs-1 col-xs-1 mx-2" data-id={`${props.doc.id}`} onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <button className="test h-100 rounded border bg-danger text-white text-right col-2 col-md-3 col-sm-2 col-xs-1 mx-2" data-id={`${props.doc.id}`} onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

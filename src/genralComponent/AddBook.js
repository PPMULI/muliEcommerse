import React, { useEffect, useState } from 'react'
import addData, { getBook, updateBook } from './Dummy';

function AddBook({id, setBookid}) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState({error: false, msg: ""});

    const editHandler = async () => {
      try {
        const docSnap = await getBook(id);
        console.log(docSnap.data())
        setEmail(docSnap.data().email)
        setName(docSnap.data().name)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      if(id !== undefined && id !== "")
      {
        editHandler()
      }
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const newbook = {
           email, name   
        }

        console.log(newbook)

        try {
          if(id !== undefined && id!== "")
          {
            await updateBook(id, newbook);
            setBookid("")
            alert("updated")
          }
          else
          {

            await addData(newbook);
            alert("Success")
          }
        } catch (error) {
            console.log("error", error)
        }

        setEmail("")
        setName("")
    }
  return (
    <>
     <form className="adminlogin" onSubmit={handleSubmit}>
        <h1 className="adminlogin_heading">Login here</h1>
        <hr />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control admininput"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder="Enter email"
            aria-describedby="emailHelp"
          />
          <hr />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Pic
          </label>

          <input
            type="text"
            className="form-control admininput"
            id="name"
            value={name}
            name="name"
            onChange={(e) => {setName(e.target.value)}}
            placeholder="Enter password"
          />
          <hr />
        </div>

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            <button
              type="submit"
              
              className="btn btn-outline-primary adminlogin_btn"
            >
              Login
            </button>
          </div>
        </div>
        {/* </div> */}
        <hr />
      </form>
    </>
  )
}

export default AddBook
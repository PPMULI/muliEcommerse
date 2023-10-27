import React, { useState } from 'react'
import Bookliost from './Bookliost'
import AddBook from '../AddBook'

function Dummybook() {
    const [bookId, setBookid] = useState("")
    const getBookIdHandler = (id) => {
        console.log(id)
        setBookid(id)
    }
  return (
    <>
    <AddBook id={bookId} setBookid = {setBookid} />
    <Bookliost getbookId={getBookIdHandler}/>
    </>
  )
}

export default Dummybook
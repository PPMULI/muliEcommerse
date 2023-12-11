import React, { useContext, useEffect } from 'react'
import projectcontext from '../projectcontext/projectContext'
import Navbar from '../genralComponent/Navbar'

function Admin() {
    const context = useContext(projectcontext)
    const {checkAuthority} = context

    // useEffect(() => {
    //     checkAuthority()
    // }, [])
  return (
    <>
    <Navbar />
    </>
  )
}

export default Admin
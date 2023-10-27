import React, { useContext, useEffect } from 'react'
import projectcontext from '../projectcontext/projectContext'

function Admin() {
    const context = useContext(projectcontext)
    const {checkAuthority} = context

    useEffect(() => {
        checkAuthority()
    }, [])
  return (
    <div>Admin</div>
  )
}

export default Admin
import React, { useContext } from 'react'
import projectcontext from '../projectcontext/projectContext'

function ProductFilters() {
    const context = useContext(projectcontext)
    const {  handleSortByPrice,
        sortByPrice} = context
  return (
    <>
     <h1>hrllo</h1>
     <p>

     <b>Sort By: </b>
     <span onClick={handleSortByPrice}>Price high to low</span>
     <span onClick={handleSortByPrice}>by rating</span>
     </p>
     <hr />
    </>
  )
}

export default ProductFilters

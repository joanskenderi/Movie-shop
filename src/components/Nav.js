import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
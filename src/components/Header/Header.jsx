import React from 'react'
import './Header.css';
const Header = () => {
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Order your favourite food here</h2>
            <p> Food culture is a unique blend of different regional cuisines, reflecting the diverse heritage.
            Some of the most popular cuisines include North Indian, South Indian, Bengali, and Chinese.</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header
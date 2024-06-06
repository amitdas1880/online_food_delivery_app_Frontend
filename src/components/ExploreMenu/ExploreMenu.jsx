import React from 'react'
import './ExploreMenu.css';
import {menu_list} from '../../assets/assets';
const ExploreMenu = (props) => {
  const {category, setCategory} =  props;
  console.log(category)
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
            Food culture is a unique blend of different regional cuisines, reflecting the diverse heritage.
            Some of the most popular cuisines include North Indian, South Indian, Bengali, and Chinese.
        </p>
        <div className='explore-menu-list' >
            {menu_list.map((item,index)=>{
                return(
                  <div className='explore-menu-list-item' 
                  onClick={()=>setCategory((prev) => prev===item.menu_name ? "All" : item.menu_name)}>
                        <img  src={item.menu_image} alt='' className={category===item.menu_name ? "active" : ""} />
                        <p>{item.menu_name}</p>
                  </div>
                )
            })}
        </div>
        <hr/>

    </div>
    
  )
}

export default ExploreMenu
import React, { useContext} from 'react'
import './FoodItemCard.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItemCard = ({key,id,name,image,price,description}) => {
 
    const {cartItems,removeFromCart,addToCart,url} = useContext(StoreContext)
    

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img src={url+"/images/"+image} alt='' className='food-item-image'/>
            {!cartItems[id]
                ? <img src={assets.add_icon_white} alt='' className='add' onClick={()=>addToCart(id)}/>
                : <div className='food-item-counter'>
                        <img src={assets.remove_icon_red} alt='' onClick={()=>removeFromCart(id)}/> 
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} alt='' onClick={()=>addToCart(id)}/>
                  </div>

            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>₹{price}</p>
        </div>
    </div>
  )
}

export default FoodItemCard
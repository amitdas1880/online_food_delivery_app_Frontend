import React, { useContext } from 'react'
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItemCard from '../FoodItemCard/FoodItemCard';

const FoodDisplay = (props) => {
    const {food_list} = useContext(StoreContext)
    const {category} = props;
  return (
    <div className='food-dispaly' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item,index)=>{
                  if(category==="All" || category===item.category){
                      return <FoodItemCard
                      key={index}
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      description={item.description}
                    />
                  
                  }                  
                })}
            </div>
    </div>
  )
}

export default FoodDisplay
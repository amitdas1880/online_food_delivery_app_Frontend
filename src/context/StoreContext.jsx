import { createContext, useEffect, useState } from "react";
import axios from "axios";
//import {food_list} from '../assets/assets';
export const StoreContext = createContext(null)

const StoreContextProvider =(props)=>{
    
    // const url = 'http://localhost:5000';
    const url = 'https://online-food-delivery-app-backend.onrender.com';
    const [token , setToken] = useState("");

    const [cartItems, setCartItems]=useState({});

    const [food_list, setFoodList]=useState([]);
    
    const addToCart = async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({
               ...prev,
                [itemId]:1
            }))
        }else{
            setCartItems((prev)=>({
                ...prev,
                 [itemId]:prev[itemId]+1
             }))
        }
        if(token){
          await axios.post(`${url}/api/cart/add`,{itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async(itemId)=>{
        setCartItems((prev)=>({
            ...prev,
             [itemId]:prev[itemId]-1
         }))
         if(token){
          await axios.post(`${url}/api/cart/remove`,{itemId}, {headers:{token}})
        }
    
    }

    const getTotalCartAmount =()=>{
        let totalAmount=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item)
                totalAmount+=itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }


    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.foods)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}});
        setCartItems(response.data.cartData)
    }


    //When we refresh the site. it doesn't logout ,if user is logged in.
    useEffect(()=>{
           
            // get food item data from mongoDB 
            async function loadData(){
                await fetchFoodList ()
                if(localStorage.getItem('token')){
                    setToken(localStorage.getItem('token'))
                    await loadCartData(localStorage.getItem('token'))
                }
            }
            loadData();
    },[])

    const contentValue ={
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        url , token , setToken,
    }

    return(
        <StoreContext.Provider value={contentValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
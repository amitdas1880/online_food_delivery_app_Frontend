import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} =useContext(StoreContext);

  const navigate = useNavigate();

  const [UserData , setUserData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler =(event)=>{

    const name = event.target.name;
    const value = event.target.value;
    setUserData(prev=>({
     ...prev,
      [name]:value
    }))
  }

//   useEffect(() => {
//     console.log(data);
//   },[data])

    const handlePayment = async(event)=>{
        event.preventDefault();

        let orderItems = [];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
     
        let orderData = {
            address:UserData,
            items:orderItems,
            amount:getTotalCartAmount()+50
        }


        try {
          //const res = await fetch(`http://localhost:5000/api/payment/order`, {
            const res = await fetch(`${url}/api/payment/order`, {
           method: "POST",
           headers: {
               "content-type": "application/json",
               "token": token
           },
           body: JSON.stringify(orderData),
       });

      const data = await res.json();
       console.log("All Data - ",data.data);
       handlePaymentVerify(data.data)

   } catch (error) {
       console.log(error);
   }

  }



   
 // handlePaymentVerify Function
 const handlePaymentVerify = async (data) => {
   
  const options = {
      key: "rzp_test_8DwQYRuTSoPzgp",
      amount: data.amount,
      currency: data.currency,
      name: "Devknus",
      description: "Test Mode",
      order_id: data.id,
      
      handler: async(response) => {
          console.log("response", response)
          console.log("cart items : ", data.notes.newOrder.items)
          try {
          
                const res = await fetch(`${url}/api/payment/verify`, {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json',
                      "token": token
                  },
                  body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                      amount: data.amount,
                      address : data.notes.newOrder.address,
                      items : data.notes.newOrder.items
                  })
              })

              const verifyData = await res.json();
              
              if (verifyData.message) {
                 toast.success(verifyData.message)           
              }
          } catch (error) {
              console.log(error);
          }
      },
      
      
      theme: {
          color: "#5f63b8"
          
      }
  };

  console.log()
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  
  navigate('/myorders');
}

useEffect(()=>{
    if(!token){
        navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
        navigate('/cart')
    }
},[token])




       


      


    

  return (
    <form className='place-order' onSubmit={handlePayment}>
          <div className='place-order-left'>
              <p className='title'>Delivery Information</p>
              <div className='multi-fields'>
                  <input required type='text' placeholder='First Name' name='firstName' onChange={onChangeHandler} value={UserData.firstName}/>
                  <input required type='text' placeholder='Last Name' name="lastName" onChange={onChangeHandler} value={UserData.lastName}/>

              </div>
              <input required type='email' placeholder='Email id' name='email' onChange={onChangeHandler} value={UserData.email}/>
              <input required type='text' placeholder='Street' name='street' onChange={onChangeHandler} value={UserData.street}/>
              <div className='multi-fields'>
                  <input required type='text' placeholder='City'  name='city' onChange={onChangeHandler} value={UserData.city}/>
                  <input required type='text' placeholder='State'  name='state' onChange={onChangeHandler} value={UserData.state}/>
              </div>
              <div className='multi-fields'>
                  <input required type='text' placeholder='Pin Code' name='pincode' onChange={onChangeHandler} value={UserData.pincode}/>
                  <input required type='text' placeholder='Country' name='country' onChange={onChangeHandler} value={UserData.country}/>
              </div>
              <input required type='text' placeholder='Phone Number' name='phone' onChange={onChangeHandler} value={UserData.phone}/>
          </div>
          <div className='place-order-right'>
              <div className='cart-total'>
                      <h2>Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                              <p>Subtotal</p>
                              <p>₹{getTotalCartAmount()}</p>
                          </div>
                          <hr/>
                          <div className='cart-total-details'>
                          <p>Delivery Fee</p>
                          <p>₹{getTotalCartAmount()===0?0:50}</p>
                      </div>
                      <hr/>
                      <div className='cart-total-details'>
                          <b>Total</b>
                          <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
                      </div>
                    </div>
                        <button type='submit'>Proceed To Payment</button>
                  </div>
          </div>
    </form>
  )
}

export default PlaceOrder
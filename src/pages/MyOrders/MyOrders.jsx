import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import {StoreContext} from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';


const MyOrders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async()=>{
        const response = await axios.post(`${url}/api/payment/userorders`,{},{
            headers:{
                "token" : token
            }
        })
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])


    return (
    <>
        <div className='my-orders'>
            <h2>My orders</h2>
            <div className='container'>
                {data.map((order,index)=>{
                    return(
                        <div className='my-orders-order' key={index}>
                                <img src={assets.parcel_icon} alt=''/>
                                <p>{order.items.map((item,idx)=>{
                                        if(idx === order.items.length-1){
                                            return item.name+" x "+item.quantity
                                        }
                                        else{
                                            return item.name+" x "+item.quantity+", "
                                        }
                                })}</p>
                                <p><b>₹{order.amount/100}.00</b></p>
                                <p>Items:<b> {order.items.length}</b></p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default MyOrders
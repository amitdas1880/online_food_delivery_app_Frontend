import React, { useContext, useState } from 'react'
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} =useContext(StoreContext);

    const [currState , setCurrState]=useState("Sign Up")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({
           ...data,
            [name]:value
        }))
    }

    const onLogin = async(e) => {
            e.preventDefault();
            let newUrl = url;
            if(currState==="Login"){
                newUrl = `${newUrl}/api/user/login`;
            }else{
                newUrl += `/api/user/register`;             // Both are correct
            }

            const response = await axios.post(newUrl,data);
            console.log(response.data);
            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
            }else{
                alert(response.data.message);
            }
    }

    

  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onLogin}>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img src={assets.cross_icon} alt='' onClick={()=>setShowLogin(false)}/>
            </div>
            <div className='login-popup-inputs'>
                {currState==='Login'? <></> :
                <input type='text' placeholder='Enter your Name' required
                    onChange={onChangeHandler} name='name' value={data.name} 
                />
                }
                <input type='email' placeholder='Enter your Email' required
                    onChange={onChangeHandler} name='email' value={data.email} />

                <input type='password' placeholder='Enter your Password' required
                    onChange={onChangeHandler} name='password' value={data.password} />

            </div>
            <button type='submit'>{currState==='Sign Up'? "Create Account" : 'Login'}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState === 'Login'
                ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")}>click here</span> </p>
                :<p>Already have an Account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp
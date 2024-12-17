import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import {useNavigate} from "react-router-dom"


const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    F_no_Building:"",
    street: "",
    city_state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data, [name]:value}));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }

    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    if(response.data.success){
      const {session_url} = response.data
      window.location.replace(session_url);
      alert("Order successfully placed")
    }else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  }, [token]) 

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'> Delivery Information</p>
        <div className='multi-fields'>
          <input required name = "firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name = "lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name = "email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name = "F_no_Building" onChange={onChangeHandler} value={data.F_no_Building} type="text" placeholder='Flat No & Building Name' />
        <div className='multi-fields'>
          <input required name = "street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <input required name = "city_state" onChange={onChangeHandler} value={data.city_state} type="text" placeholder='City & State' />
        </div>
        <div className='multi-fields'>
          <input required name = "zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zipcode' />
          <input required name = "country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name = "phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
      <div className='cart-total'>
          <h2> Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p> Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Free</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:2+getTotalCartAmount()}</b>
            </div>
          </div>

          <button type='submit'> PROCEED TO PAYMENT </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

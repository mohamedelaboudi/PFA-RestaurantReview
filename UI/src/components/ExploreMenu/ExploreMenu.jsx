import React, { useContext } from 'react'
import './ExploreMenu.css'
import PropTypes from 'prop-types';

import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({city,setcity}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 >Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setcity(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={city===item.menu_name?"active":""} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}
ExploreMenu.propTypes = {
  city: PropTypes.func.isRequired,
  setcity: PropTypes.func.isRequired,

};
export default ExploreMenu

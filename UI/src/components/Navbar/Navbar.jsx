import React, {  useState , useContext} from 'react'
import  './Navbar.css'
import logout_icon from '../../assets/logout_icon.png'; // Corrected import statement
import  profile_icon from'../../assets/profile_icon.png';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets'
import { Link ,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  
    const { token, setToken } = useContext(StoreContext); 

    const navigate = useNavigate();


    const logout =() => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <Link to="/Reviews" onClick={()=>setMenu("Reviews")} className={`${menu==="Reviews"?"active":""}`}>Reviews</Link>
      </ul>
      <div className="navbar-right">
      {!token ? (
                <button onClick={() => setShowLogin(true)} className="navbar-sign-in">Sign In</button>
            ) : (
                <div className='navbar-profile'>
                    <img src={profile_icon} className="profile-icon" alt="profile" />
                    <ul className="nav-profile-dropdown">
                        <hr />
                        <li onClick={logout}>
                            <img src={logout_icon} alt="logout" className="logout-icon" />
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>
            )}      </div>
    </div>
  )
}
Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar

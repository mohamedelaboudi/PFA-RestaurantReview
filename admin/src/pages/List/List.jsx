import { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const List = () => {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchList = async () => {
    try {
      const response = await axios.get("https://localhost:7003/api/Restaurants/allReastaurants");
      const data = response.data.$values || []; // Extracting the actual data
      setList(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error fetching restaurant list");
    }
  }

  const removeFood = async (restaurantId) => {
    try {
      const response = await axios.delete(`https://localhost:7003/api/Restaurants/deleterestaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      await fetchList();
      if (response.status === 204) {
        toast.success("Restaurant deleted successfully");
      } else {
        toast.error("Error deleting restaurant");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error deleting restaurant");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  // Ensure list is an array before calling map
  if (!Array.isArray(list)) {
    return null;
  }

  return (
    <div className='list add flex-col'>
      <p>All Restaurants List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>City</b>
          <b>Address</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={item.imageUrl} alt="" />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.city}</p>
            <p>{item.address}</p>
            <p className='cursor' onClick={() => removeFood(item.restaurantId)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;

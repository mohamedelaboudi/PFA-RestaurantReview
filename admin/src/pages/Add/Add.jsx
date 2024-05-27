import  { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../firebase/FirebaseConfig.jsx';
import { v4 as uuidv4 } from 'uuid';
import { assets } from '../../assets/assets';
import AddressMap from './AddressMap.jsx';

const Add = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    imageUrl: ''
  });

  const [image, setImage] = useState(null);
  const token = localStorage.getItem('token');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      const imageRef = ref(imageDb, `files/${uuidv4()}`);
      const uploadTaskSnapshot = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      const updatedData = { ...data, imageUrl: downloadURL };

      const response = await fetch('https://localhost:7003/api/Restaurants/AddResturant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(response);
      alert('Restaurant added successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading. Please try again later.');
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const setAddress = (address) => {
    setData((prevData) => ({ ...prevData, address }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="md:flex">
        <div className="md:w-1/2">
          <form className="border border-gray-300 p-4 rounded" onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <p className="font-semibold">Upload image</p>
              <label htmlFor="image" className="block mt-2">
                <img src={image ? data.imageUrl : assets.upload_area} alt="" className="w-24" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="mb-4">
              <p className="font-semibold">Restaurant name</p>
              <input name="name" onChange={onChangeHandler} value={data.name} type="text" className="border border-gray-300 px-4 py-2 mt-2 w-full" placeholder="Type here" required />
            </div>
            <div className="mb-4">
              <p className="font-semibold">Restaurant description</p>
              <textarea name="description" onChange={onChangeHandler} value={data.description} rows={6} className="border border-gray-300 px-4 py-2 mt-2 w-full" placeholder="Write content here" required />
            </div>
            <div className="mb-4">
              <p className="font-semibold">Selected Address: {data.address}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">City</p>
              <select name="city" onChange={onChangeHandler} value={data.city} className="border border-gray-300 px-4 py-2 mt-2 w-full">
                <option value="Tanger">Tanger</option>
                <option value="Tetouan">Tetouan</option>
                <option value="Martil">Martil</option>
                <option value="Oujda">Oujda</option>
                <option value="Marakech">Marakech</option>
                <option value="Agadir">Agadir</option>
                <option value="Nador">Nador</option>
                <option value="Hocima">Hocima</option>
              </select>
            </div>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded cursor-pointer">ADD</button>
          </form>
        </div>
        <div className="md:w-1/2">
          <div className="border border-gray-300 p-4 rounded h-[400px]">
            <h1 className="text-xl font-semibold mb-4">Choose address from the map!</h1>
            <AddressMap setAddress={setAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [city,setcity] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setcity={setcity} city={city}/>
      <FoodDisplay city={city}/>
  </>
  )
}

export default Home

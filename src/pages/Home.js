import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className='flex flex-row gap-6'>
   <Link to="/donate-money">   <button className='border-2 border-blue-900 p-3 text-3xl'>Donate Money</button></Link>
   <Link to="/donate-items">   <button className='border-2 border-blue-900 p-3 text-3xl'>Donate Items</button></Link>
    </div>
  )
}

export default Home

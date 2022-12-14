import React from 'react'
import BreadBar from '../components/BreadBar'

const Layout = ({children}) => {
  return (
    <div>
        <BreadBar/>
        <div className='flex justify-center items-center'>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-6"></div>
        </div>
        <div className='container mx-auto'> 
            {children}
        </div>
    </div>
  )
}

export default Layout
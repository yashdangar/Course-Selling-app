import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
function Card({title,imageUrl,description,price,courseId,path=""}) {
  const navigate = useNavigate();
  return (
    <div className='w-[24vw] h-[24vw] rounded-md border-2 border-gray-950 p-3'>
        <img src={imageUrl} alt={title} className='rounded-md h-[12vw] w-[22vw] bg-center object-cover' />
         <h3 className='text-md font-medium text-gray-900 mt-2'>{title}</h3>
         <p className='text-md text-gray-500'>{description}</p>
         <p className='text-md text-gray-500'>{price}</p>
         {(path !=="published"&& path!=="admin" &&path !=="my")  && <button onClick={()=>navigate(`/all/${courseId}/payment`)} className='w-full h-[3vw] bg-indigo-600 text-white rounded-md font-medium text-sm mt-2'>Add to Cart</button>}
         {path ==="published"&& <button onClick={()=>navigate(`/${courseId}/edit`)} className='w-full h-[3vw] bg-indigo-600 text-white rounded-md font-medium text-sm mt-2'>Edit Course</button>}
    </div>
  )
}

export default Card
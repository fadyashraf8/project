import axios from 'axios';
import React, { useState } from 'react'

export default function Home() {


   
  
  
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  
   
  

  
  return (
    <>
      <div className='container mt-5'>
        <form action="" >
        <label htmlFor="" className='h2' >TEXT</label>
        <input type="text" className='form form-control' />

        <input type="file" name="" id="" onChange={handleChange} className='form form-control mt-5' />
       <div className='text-center mt-4'>
       <img src={file} className='w-75'  />
       </div>
        </form>
      </div>
    </>
  )
}

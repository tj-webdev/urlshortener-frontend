import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Redirect() {
  const [valid,setValid] = useState(true); 
  const params = useParams();

  useEffect(()=>{ 

    const getUrl = async ()=>{
      const referer = document.referrer ? '?referer='+document.referrer : '';
      try{
        const request = await axios.get('/'+params.id+referer);
        window.location = request.data;
      }
      catch(err){
        setValid(false);
      }
    }
    getUrl() 
  },[]);

  return(
    <h5 className='text-center mt-5 fw-bold'>
      {valid ? "Redirecting..." : "Invalid URL"}
    </h5>
  )
}

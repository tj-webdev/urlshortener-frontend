import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

export default function Redirect() {

  const navigate = useNavigate();
  const params = useParams();

  const getUrl = async ()=>{
    try{
      const request = await axios.get('http://localhost:4000/'+params.id+'?referer='+document.referrer);
      window.location = request.data;
    }
    catch(err){
      navigate('/404',{replace: true});
    }
  }

  getUrl();

  return(
    <h5 className='text-center mt-5'>Redirecting...</h5>
  )
}

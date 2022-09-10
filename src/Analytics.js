import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import userAuthStore from './auth/userAuth';

export default function Analytics() {

  const setAuth = userAuthStore((state)=>state.setAuth);

  const navigate = useNavigate();
  const params = useParams();
  const [data,setData] = useState({});

  async function getUrlAnalytics(){
    try{
      const request = await axios.get('/shorturl/analytics/'+params.id,
        {withCredentials: true}
      );
      setData(request.data);
    }
    catch(err){
      if(err.response.data.loggedIn===false){
        setAuth({name: undefined, loggedIn: false});
      }
      else{
        navigate('/404',{replace: true});
      }
    }
  }

  useEffect(()=>{
    getUrlAnalytics();
  },[])

  return (
    <div>
      
      <div className='container mt-5'>

        <Link to="/dashboard" className="btn btn-info text-light btn-sm mb-4">Go Back</Link>

        <h5 className='fw-bold mb-3'>Total Clicks: { data.totalClicks }</h5>

        <table className="table table-hover">
          <thead className='blue-color-bgonly text-light'>
            <tr>
              <th scope="col">#</th>
              <th scope="col" width="50%">Referrer URL</th>
              <th scope="col">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {
              data.refererUrls && data.refererUrls.map((url,i) => {
                return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{url.url}</td>
                    <td>{url.clicks}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

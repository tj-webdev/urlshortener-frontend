import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function Analytics() {

  const navigate = useNavigate();
  const params = useParams();
  const [data,setData] = useState({});

  async function getUrlAnalytics(){
    try{
      const request = await axios.get('http://localhost:4000/shorturl/analytics/'+params.id,
        {withCredentials: true}
      );
      setData(request.data);
    }
    catch(err){
      navigate('/invalidlink',{replace: true});
    }
  }

  useEffect(()=>{
    getUrlAnalytics();
  },[])

  return (
    <div>
      
      <div className='container mt-5'>

        <h5 className='fw-bold mb-3'>Total Clicks: { data.totalClicks }</h5>

        <table className="table table-hover">
          <thead className='blue-color-bgonly text-light'>
            <tr>
              <th scope="col">#</th>
              <th scope="col" width="50%">Referer URL</th>
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

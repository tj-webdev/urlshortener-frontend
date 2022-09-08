import React from 'react';
import {Link} from 'react-router-dom';

export default function Shorturls(props) {

  function copyToClipboard(url){
    navigator.clipboard.writeText(url);
  }

  return (
    <tr>
      <th scope="col">{props.index+1}</th>
      <th scope="col">{props.data.longUrl}</th>
      <th scope="col">{props.data.shortUrl}</th>
      <th scope="col">
        <button onClick={copyToClipboard('http://localhost:3000/'+props.data.shortUrl)} className='btn btn-sm btn-info text-light shadow-none me-3'>
          Copy
        </button>
        <Link to={"/analytics/"+props.data._id} className="btn btn-primary btn-sm">
          Analytics
        </Link>
      </th>
    </tr>
  )
}

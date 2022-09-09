import React, { useEffect, useState } from 'react';
import Shorturls from './components/Shorturls';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import userAuthStore from './auth/userAuth';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  longUrl:''
}

const validationSchema = Yup.object().shape({
  longUrl: Yup.string().required('Required!').url('Enter a valid URL!')
});


export default function Dashboard() {

  const [urlData,setUrlData] = useState([]);

  async function getUrlData(){
    try{
      const request = await axios.get('http://localhost:4000/getshorturl',{withCredentials: true});
      setUrlData(request.data);
    }
    catch(err){
      setAuth({name: undefined, loggedIn: false});
    }
  }

  useEffect(()=>{ getUrlData() },[]);

  const setAuth = userAuthStore((state)=>state.setAuth);

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = async (formData, onSubmit) => {
    setLoading(true);
    try{
      const request = await axios.post('http://localhost:4000/shorturl',
        formData,
        {withCredentials: true}
      );
      setLoading(false);
      getUrlData((prev)=> [request.data,...prev]);
      
      onSubmit.resetForm();
    }
    catch(err){
      setLoading(false);
      if(err.response.data.loggedIn===false){
        setAuth({name: undefined, loggedIn: false});
      }
      else{
        setError(err.response.data);
      }
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mt-5'>
            <Formik 
              initialValues={initialValues} 
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className='p-4 bg-white shadow rounded'>
                <h4 className='mb-3 fw-bold'>Shorten URL</h4>
                <div className="mb-3">
                  <label className="form-label">Long URL</label>
                  <Field type="text" name='longUrl' className="shadow-none form-control" placeholder='Paste your url here...' />
                  <ErrorMessage name='longUrl' component='div' className='text-danger mt-3' />
                </div>
                
                {error ? <div className='text-danger mt-3 mb-3'>{error}</div> : null}

                <button
                  type="submit" 
                  className="shadow-none btn btn-dark btn-sm"
                  disabled={isLoading}
                >
                  { 
                    isLoading ? 
                    (<><span className='spinner-border spinner-border-sm' role='status'></span> Generating...</>)
                    : "Generate"
                  }
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>


      <div className='container mt-5'>
        <div className='table-responsive'>
          <table className="table table-hover">
            <thead className='blue-color-bgonly text-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col" width="50%">Long URL</th>
                <th scope="col">Short ID</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                urlData.map((url,i)=>{
                  return <Shorturls data={url} index={i} key={i} />
                })
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Invalid Email!'),

  password: Yup.string()
    .required('Password is required')
    .min(6,'Minium password length is 6 characters')
});


export default function Login() {

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = async (formData) => {
    setLoading(true);
    try{
      const request = await axios.post('http://localhost:4000/user/login',formData,{withCredentials: true});
      console.log(request.data);
    }
    catch(err){
      setLoading(false);
      setError(err.response.data);
    }
  }

  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <Formik 
              initialValues={initialValues} 
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className='p-4 bg-white shadow rounded-3'>
                <h1 className='mb-4 fw-bold blue-color'>Log In</h1>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field type="text" name='email' className="form-control" />
                  <ErrorMessage name='email' component='div' className='text-danger' />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Field type="password" name='password' className="form-control" />
                  <ErrorMessage name='password' component='div' className='text-danger' />
                </div>
                {error ? <div className='text-danger mb-3'>{error}</div> : null}
                <button 
                  type="submit" 
                  className="btn btn-primary shadow-none blue-color-bg mt-1 mb-1"
                  disabled={isLoading}
                >
                  { 
                    isLoading ? 
                    (<><span className='spinner-border spinner-border-sm' role='status'></span> Loading...</>)
                    : "LOG IN"
                  }
                </button>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </div>
  )
}

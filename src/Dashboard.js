import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  long_url:''
}

const validationSchema = Yup.object().shape({
  long_url: Yup.string().required('Required!')
});


export default function Login() {

  const [error, setError] = useState(null);
  
  const onSubmit = (values) => {
    if(values.email==='tj@tj.com'){
      setError('Email not registered');
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
                <h4 className='mb-3'>Shorten URL</h4>
                <div className="mb-3">
                  <label className="form-label">Long URL</label>
                  <Field type="text" name='long_url' className="form-control" placeholder='Paste your url here...' />
                  <ErrorMessage name='long_url' component='div' className='text-danger' />
                </div>
                {error ? <div className='text-danger mb-3'>{error}</div> : null}
                <button type="submit" className="btn btn-success">Generate</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';
const Signup = () => {
  const [values, setValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const {
    first_name,
    middle_name,
    last_name,
    email,
    password,
    error,
    success,
  } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ first_name, middle_name, last_name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in Sign Up..'));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                type="text"
                name=""
                onChange={handelChange('first_name')}
                value={first_name}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Middel Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handelChange('middle_name')}
                name=""
                value={middle_name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                type="text"
                name=""
                value={last_name}
                onChange={handelChange('last_name')}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                name=""
                value={email}
                onChange={handelChange('email')}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                name=""
                value={password}
                onChange={handelChange('password')}
                required
              />
            </div>
            <button onClick={onSubmit} className="btn btn-info btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? '' : 'none' }}
          >
            New Account was Created Successfully. Please{' '}
            <Link to="/signin"> Login Here !!</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="Page for user to Sign Up !">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;

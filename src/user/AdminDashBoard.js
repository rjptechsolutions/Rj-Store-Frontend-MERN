import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
  const {
    user: { first_name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white"> Admin Navigation </h4>{' '}
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/create/category">
              Create Categories{' '}
            </Link>{' '}
          </li>{' '}
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/categories">
              Manage Categories
            </Link>{' '}
          </li>{' '}
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/create/product">
              Create Product{' '}
            </Link>{' '}
          </li>{' '}
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/products">
              Manage Products{' '}
            </Link>{' '}
          </li>{' '}
          <li className="list-group-item">
            <Link className="nav-link text-info" to="/admin/orders">
              Manage Orders{' '}
            </Link>{' '}
          </li>{' '}
        </ul>{' '}
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header"> Admin Information </h4>{' '}
        <ul className="list-group">
          <li className="list-group-item">
            <spam className="badge badge-info mr-2"> Name: </spam> {first_name}{' '}
          </li>{' '}
          <li className="list-group-item">
            <spam className="badge badge-info mr-2"> Email: </spam> {email}{' '}
          </li>{' '}
          <li className="list-group-item">
            <spam className="badge badge-danger mr-2"> Admin Area </spam>{' '}
          </li>{' '}
        </ul>{' '}
      </div>
    );
  };
  return (
    <Base
      title="AdminDashBoard Page"
      description="Manage All Products and Orders Here !!"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-3"> {adminLeftSide()} </div>{' '}
        <div className="col-9"> {adminRightSide()} </div>{' '}
      </div>{' '}
    </Base>
  );
};
export default AdminDashBoard;

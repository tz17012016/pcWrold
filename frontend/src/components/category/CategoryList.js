import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { Link } from 'react-router-dom';
import { getCategories } from '../../actions/categoryActions';
const CategoryList = () => {
  const dispatch = useDispatch();
  const CategoryList = useSelector((state) => state.CategoryList);
  const { categories } = CategoryList;
  const { loading, error } = CategoryList;
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showCategories = () =>
    categories.map((category) => (
      <div
        key={category._id}
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
        <Link to={`/category/${category.slug}`}>{category.name}</Link>
      </div>
    ));

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;

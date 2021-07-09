import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../actions/categoryActions';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, [dispatch]);

  const loadCategories = async () => {
    return await dispatch(getCategories());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await dispatch(createCategory({ name }, userInfo.token));
      setLoading(false);
      setName('');
      loadCategories();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      try {
        await dispatch(removeCategory(slug, userInfo.token));
        setLoading(false);
        loadCategories();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  const searched =
    (keyword = '') =>
    (c) =>
      c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row text-end'>
        <div className='col mx-auto shadow p-3 main rounded mt-3'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>צור קטגורייה</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {categories.length > 1 &&
            categories?.filter(searched(keyword))?.map((category) => (
              <div
                className=' text-end alert alert-secondary'
                key={category._id}>
                <span className='text-end'>{category.name}</span>
                <span
                  onClick={() => handleRemove(category.slug)}
                  className='btn btn-sm float-left'>
                  <DeleteOutlined className='text-danger' />
                </span>
                <Link to={`/admin/category/${category.slug}`}>
                  <span className='btn btn-sm float-left'>
                    <EditOutlined className='text-warning' />
                  </span>
                </Link>
              </div>
            ))}
        </div>
        <div className='col-md-2 text-end'>
          <AdminNav />
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;

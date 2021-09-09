import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../actions/categoryActions';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import LocalSearch from '../../../components/forms/LocalSearch';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import MessageTimer from '../../../components/MessageTimer';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'שם קצר מדי - חייב להית 2 תווים לפחות')
    .max(100, 'שם ארוך מדי - חייב להיות לכל היותר 100 תווים')
    .trim()
    .uppercase()
    .required('חובה לרשום שם'),
});

const CategoryCreate = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const { error, success } = useSelector((state) => ({
    ...state.CreateCategory,
  }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const initialValues = {
    name: '',
  };
  useEffect(() => {
    loadCategories();
  }, [dispatch]);

  const loadCategories = async () => {
    return await dispatch(getCategories());
  };

  const handleSubmit = async (values, actions) => {
    const { name } = values;
    try {
      setLoading(true);
      await dispatch(createCategory({ name }, userInfo.token));
      setLoading(false);
      setName('');
      loadCategories();
      actions.resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
      actions.resetForm();
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
          {error && <MessageTimer variant='danger'>{error}</MessageTimer>}
          {success && (
            <MessageTimer variant='alert alert-success'>
              קטגורייה נוצרה בהצלחה
            </MessageTimer>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}>
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Form>
                  <div className='form-group'>
                    <label className='text-muted'>שם</label>
                    <Field
                      type='text'
                      name='name'
                      id='name'
                      className={
                        errors.name && touched.name
                          ? 'input-error form-control'
                          : 'form-control'
                      }
                    />
                    <br />
                    <ErrorMessage
                      name='name'
                      component='span'
                      className='error text-danger'
                    />
                  </div>

                  <button
                    type='submit'
                    className={
                      !(dirty && isValid)
                        ? 'btn btn-outline-primary disabled-btn'
                        : 'btn btn-outline-primary'
                    }
                    disabled={!(dirty && isValid)}>
                    שמור
                  </button>
                </Form>
              );
            }}
          </Formik>
          <br />

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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../actions/categoryActions';
import { Link } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import { useHistory } from 'react-router-dom';
import Loader from '../../../components/Loader';
import MessageTimer from '../../../components/MessageTimer';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'שם קצר מדי - חייב להית 2 תווים לפחות')
    .max(100, 'שם ארוך מדי - חייב להיות לכל היותר 100 תווים')
    .trim()
    .uppercase()
    .required('חובה לרשום שם'),
});

const CategoryUpdate = ({ match }) => {
  const initialValues = {
    name: '',
  };
  let history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const UpdateCategory = useSelector((state) => ({ ...state.UpdateCategory }));
  const { category } = useSelector((state) => {
    return { ...state.getCategory };
  });
  const { error, success } = useSelector((state) => ({
    ...state.CreateCategory,
  }));
  const slug = match.params.slug;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [dispatch]);

  const loadCategory = async () => {
    return await dispatch(getCategory(slug));
  };

  const handleSubmit = async (values, actions) => {
    const { name } = values;
    try {
      setLoading(true);
      console.log(slug);
      await dispatch(updateCategory(slug, { name }, userInfo.token));
      setLoading(false);
      setName('');
      history.push('/admin/category');
      actions.resetForm();
    } catch (error) {
      console.log(error);
      setLoading(false);
      actions.resetForm();
    }
  };

  return (
    <>
      <Link to='/admin/category' className='btn btn-light my-3'>
        חזור אחורה
      </Link>
      <FormContainer>
        <div className='main mx-auto shadow p-3 rounded mt-3 '>
          {loading ? (
            <h4 className='text-danger'>
              <Loader />
            </h4>
          ) : (
            <h4>עדכון קטגורייה</h4>
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
                <Form className=' text-end'>
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
        </div>
      </FormContainer>
    </>
  );
};

export default CategoryUpdate;

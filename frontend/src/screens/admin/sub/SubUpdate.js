import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../actions/categoryActions';
import { updateSub, getSub } from '../../../actions/subActions';
import { Link } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import Loader from '../../../components/Loader';
import Message from '../../../components/MessageTimer';
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

const SubUpdate = ({ match, history }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const UpdateSub = useSelector((state) => ({ ...state.UpdateSub }));
  const { success: successUpdate } = UpdateSub;
  const geteSub = useSelector((state) => ({ ...state.geteSub }));
  const { sub } = geteSub;
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const { error, success } = useSelector((state) => ({ ...state.CreateSub }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState('');
  const initialValues = {
    name: '',
  };

  useEffect(() => {
    loadCategories();
    loadSub();
  }, [dispatch]);

  const loadCategories = async () => {
    return await dispatch(getCategories());
  };

  const loadSub = async () => {
    return await dispatch(getSub(match.params.slug));
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    const { name } = values;
    try {
      setLoading(true);
      dispatch(updateSub(match.params.slug, { name, parent }, userInfo.token));
      setLoading(false);
      setName('');
      actions.resetForm();
      history.push('/admin/sub');
    } catch (error) {
      console.log(error);
      actions.resetForm();
      setLoading(false);
    }
  };

  return (
    <>
      <Link to='/admin/sub' className='btn btn-light my-3'>
        חזור אחורה
      </Link>
      <FormContainer>
        <div className='main mx-auto shadow p-3 rounded mt-3 '>
          {loading ? (
            <h4 className='text-danger'>
              <Loader />
            </h4>
          ) : (
            <h4>עדכון קטגוריית משנה</h4>
          )}
          {error && <Message variant='danger'>{error}</Message>}
          {success && (
            <Message variant='alert alert-success'>
              קטגורייה נוצרה בהצלחה
            </Message>
          )}
          <div className='form-group'>
            <label>קטגוריית הורה</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => (
                setParent(e.target.value), console.log(e.target.value)
              )}>
              <option>אנא בחר</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    defaultValue={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

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
        </div>
      </FormContainer>
    </>
  );
};

export default SubUpdate;

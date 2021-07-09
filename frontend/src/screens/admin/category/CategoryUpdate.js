import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../actions/categoryActions';
import CategoryForm from '../../../components/forms/CategoryForm';
import { CATEGORY_UPDATE_RESET } from '../../../constants/categoryConstants';
import { Link } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import { useHistory } from 'react-router-dom';
import Loader from '../../../components/Loader';

const CategoryUpdate = ({ match }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const UpdateCategory = useSelector((state) => ({ ...state.UpdateCategory }));
  const { success: successUpdate } = UpdateCategory;
  const { category } = useSelector((state) => {
    return { ...state.getCategory };
  });
  const slug = match.params.slug;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [dispatch]);

  const loadCategory = async () => {
    return await dispatch(getCategory(slug));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(slug);
      await dispatch(updateCategory(slug, { name }, userInfo.token));
      setLoading(false);
      setName('');
      //window.location.href = '/category';
      history.push('/admin/category');
    } catch (error) {
      console.log(error);
      setLoading(false);
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

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </FormContainer>
    </>
  );
};

export default CategoryUpdate;
/**
 *
 */

import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../actions/categoryActions';
import CategoryForm from '../../../components/forms/CategoryForm';
import { CATEGORY_UPDATE_RESET } from '../../../constants/categoryConstants';

const CategoryUpdate = ({ history, match }) => {
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
      window.location.href = '/category';
      //history.push('/category');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

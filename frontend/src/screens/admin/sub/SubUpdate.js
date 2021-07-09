import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../actions/categoryActions';
import { updateSub, getSub } from '../../../actions/subActions';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import FormContainer from '../../../components/FormContainer';
import Loader from '../../../components/Loader';

const SubUpdate = ({ match, history }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const UpdateSub = useSelector((state) => ({ ...state.UpdateSub }));
  const { success: successUpdate } = UpdateSub;
  const geteSub = useSelector((state) => ({ ...state.geteSub }));
  const { sub } = geteSub;
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(updateSub(match.params.slug, { name, parent }, userInfo.token));
      setLoading(false);
      setName('');
      history.push('/admin/sub');
    } catch (error) {
      console.log(error);
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

          <div className='form-group'>
            <label>קטגוריית הורה</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}>
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

export default SubUpdate;

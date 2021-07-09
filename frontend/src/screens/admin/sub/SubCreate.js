import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../actions/categoryActions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createSub, removeSub, getSubs } from '../../../actions/subActions';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { Container } from 'react-bootstrap';
import UserNav from '../../../components/nav/UserNav';

const SubCreate = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const subsList = useSelector((state) => ({ ...state.subsList }));
  const { subs } = subsList;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, [dispatch]);

  const loadCategories = async () => {
    return await dispatch(getCategories());
  };

  const loadSubs = async () => {
    return await dispatch(getSubs());
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await dispatch(createSub({ name, parent: category }, userInfo.token));
      setLoading(false);
      setName('');
      loadSubs();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      try {
        setLoading(true);
        await dispatch(removeSub(slug, userInfo.token));
        setLoading(false);
        loadSubs();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row text-end'>
        <div className='col mx-auto main shadow p-3 rounded mt-3'>
          <Container className='mb-2 container-fluid row justify-content-center'>
            {loading ? (
              <h4 className='text-danger'>Loading..</h4>
            ) : (
              <h4 className='text-center'>קטגוריות משנה</h4>
            )}
            <div className='form-group'>
              <label>קטגוריית הורה</label>
              <select
                name='category'
                className='form-control'
                onChange={(e) => setCategory(e.target.value)}>
                <option>בחר</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
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
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {subs.length > 1 &&
              subs.filter(searched(keyword)).map((sub) => (
                <div className='alert alert-secondary ' key={sub._id}>
                  <span className='text-end'>{sub.name}</span>
                  <span
                    onClick={() => handleRemove(sub.slug)}
                    className='btn btn-sm float-left'>
                    <DeleteOutlined className='text-danger' />
                  </span>
                  <Link to={`/admin/sub/${sub.slug}`}>
                    <span className='btn btn-sm float-left'>
                      <EditOutlined className='text-warning' />
                    </span>
                  </Link>
                </div>
              ))}
          </Container>
        </div>
        <div className='col-md-2 text-end'>
          {userInfo.isAdmin ? <AdminNav /> : <UserNav />}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;

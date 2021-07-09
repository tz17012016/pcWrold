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

const CategoryCreate = ({ history, match }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => ({ ...state.userLogin.userInfo }));
  const CategoryList = useSelector((state) => ({ ...state.CategoryList }));
  const { categories } = CategoryList;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  // step 1
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
      // toast.success(`"${res.data.name}" is created`);
      //await dispatch(getCategories());
      loadCategories();
    } catch (error) {
      console.log(error);
      setLoading(false);
      //if (error.response.status === 400) toast.error(error.response.data);
    }
    // console.log(res)
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm('Delete?')) {
      setLoading(true);
      try {
        await dispatch(removeCategory(slug, userInfo.token));
        setLoading(false);
        // toast.error(`${res.data.name} deleted`);
        loadCategories();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  // todo:we can new commpenet refuctor
  /*const red = (category) => {
    return (
      <div className='alert alert-secondary' key={category._id}>
        {category.name}
        <span
          onClick={() => handleRemove(category.slug)}
          className='btn btn-sm float-right'>
          <DeleteOutlined className='text-danger' />
        </span>
        <Link to={`/category/${category.slug}`}>
          <span className='btn btn-sm float-right'>
            <EditOutlined className='text-warning' />
          </span>
        </Link>
      </div>
    );
  };*/

  // step 4
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

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {/* step 5 */}
          {console.log(categories)}
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
/**<div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step 2 and step 3 */
/*  <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */
/* {categories ? (
            categories.filter(searched(keyword)).map((c) => red(c))
          ) : (
            <p>No categories</p>
          )}
        </div>
      </div>
    </div> */

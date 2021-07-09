import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const SearchBox = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type='search'
        value={text}
        className='form-control mr-sm-2'
        placeholder='Search'
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default SearchBox;

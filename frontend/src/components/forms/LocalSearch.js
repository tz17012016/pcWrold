import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type='search'
      placeholder='...חיפוש'
      value={keyword}
      onChange={handleSearchChange}
      className='form-control text-end mb-4'
    />
  );
};

export default LocalSearch;

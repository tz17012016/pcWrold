import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group text-end'>
      <label>שם</label>
      <input
        type='text'
        className='form-control text-end'
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button className='btn btn-outline-primary '>שמור</button>
    </div>
  </form>
);

export default CategoryForm;

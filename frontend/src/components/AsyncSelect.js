import React, { useState } from 'react';

import AsyncSelect from 'react-select/async';

const AsyncMulti = () => {
  const [inputValue, setinputValue] = useState('');

  const filterColors = (inputValue) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) => {
    filterColors(inputValue);
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setinputValue({ inputValue });
    return inputValue;
  };
  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
    />
  );
};

export default AsyncMulti;

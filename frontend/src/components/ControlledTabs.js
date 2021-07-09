import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const ControlledTabs = ({ product }) => {
  const [key, setKey] = useState('description');

  return (
    <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='description' title='תיאור'>
        <h4 className='text-end'>:תיאור המוצר</h4>
        {product.description}
      </Tab>
      <Tab eventKey='productWebsite' title='קישור לדף היצרן'>
        <h4 className='text-end'>:תיאור המוצר</h4>
        {product.description}
      </Tab>
    </Tabs>
  );
};

export default ControlledTabs;

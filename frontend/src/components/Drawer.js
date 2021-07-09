import React from 'react';
import { Drawer } from 'antd';

const DrawerD = ({ setVisible, visible }) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Drawer
        title='Basic Drawer'
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default DrawerD;

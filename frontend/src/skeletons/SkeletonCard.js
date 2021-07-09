import React from 'react';
import { Card } from 'react-bootstrap';
import SkeletonElement from './SkeletonElement';

const skeletonCard = () => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <SkeletonElement type='thumbnail' />
        <Card.Body>
          <Card.Title as='div'>
            <SkeletonElement type='title' />
          </Card.Title>
          <Card.Text as='div'>
            <SkeletonElement type='text' />
          </Card.Text>
          <SkeletonElement type='title' />
        </Card.Body>
      </Card>
    </div>
  );
};

export default skeletonCard;

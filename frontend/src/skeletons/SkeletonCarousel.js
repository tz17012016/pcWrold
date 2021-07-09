import React from 'react';
import { Carousel } from 'react-bootstrap';
import SkeletonElement from './SkeletonElement';

const SkeletonCarousel = () => {
  return (
    <div>
      <Carousel pause='hover' className='skeleton rounded'>
        <SkeletonElement type='carousel' />
      </Carousel>
    </div>
  );
};
export default SkeletonCarousel;

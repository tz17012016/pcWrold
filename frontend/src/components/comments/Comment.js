import React from 'react';
import { Comment, Avatar } from 'antd';
import Rating from '../Rating';

const Comments = ({ review }) => {
  return (
    <Comment
      author={review.name}
      avatar={
        <Avatar
          src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          alt={review.name}
        />
      }
      content={
        <div>
          <p>{review.comment}</p>
          <Rating value={review.rating} />
          {review.createdAt.substring(0, 10)}
        </div>
      }></Comment>
  );
};

export default Comments;

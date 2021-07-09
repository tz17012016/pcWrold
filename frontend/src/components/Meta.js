import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: '  PC_WROLD ברוך הבא לחנותנו ',
  description: 'אנו מוכרים את המוצרים החדשניים ביותר במחיר הכי זול ומשתלם לכם',
  keywords: 'אלקטרוניקה, קניית אלקטרוניקה, אלקטרוניקה זולה',
};

export default Meta;

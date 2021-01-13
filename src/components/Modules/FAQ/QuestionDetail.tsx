import React from 'react';

import ContactCardView from '../../Layout/Card/ContactCardView';

type Props = {
  id?: string;
  question?: string;
  author?: string;
  postDate?: string;
  answer?: string;
  status?: string;
};

function QuestionDetail(props: Props) {
  function createMarkup() {
    return { __html: props.answer };
  }
  return (
    <div className="mb-3 mt-3">
      <div className="question_detail" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default QuestionDetail;

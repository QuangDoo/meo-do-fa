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

function QuestionDetail(props: Props): JSX.Element {
  function createMarkup() {
    return { __html: props.answer };
  }
  return (
    <div className="mb-3">
      <div className="news-header__poston text-small text-left">
        {`post on `}
        <b>{props.postDate}</b>
        {` by `}
        <b>{props.author}</b>
      </div>
      <div className="news__divider"></div>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default QuestionDetail;

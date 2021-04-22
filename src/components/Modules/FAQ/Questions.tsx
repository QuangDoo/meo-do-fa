import React from 'react';

type Props = {
  questions?: any;
};

function Questions(props: Props) {
  return (
    <div className="wrapper">
      <div className="list-unstyled mb-3">
        {props?.questions.map((question, index) => (
          <li key={index} className="faq-question mb-3">
            <a className="faq-link">{question.title}</a>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Questions;

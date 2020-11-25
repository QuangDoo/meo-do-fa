import Link from 'next/link';
import React from 'react';

type Props = {
  questions?: any;
};

function Questions(props: Props): JSX.Element {
  return (
    <div className="wrapper">
      <div className="list-unstyled mb-3">
        {props?.questions.map((question, index) => (
          <li key={index} className="faq-question mb-3">
            <Link href={`/help${question.href}`}>
              <a className="faq-link">{question.title}</a>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Questions;

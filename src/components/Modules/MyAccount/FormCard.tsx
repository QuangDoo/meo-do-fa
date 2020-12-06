import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const FormCard = (props: Props) => {
  return (
    <div className="row elevated mb-4">
      <div className="col pt-3">
        <h2 className="h4 text-center mb-3">{props.title}</h2>

        {props.children}
      </div>
    </div>
  );
};

export default FormCard;

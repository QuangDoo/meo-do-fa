import React from 'react';

function MessageOurFounder(props): JSX.Element {
  return (
    <>
      <div className="message-founder">
        <div className="container-sm">
          <div className="row">
            <div className="col">
              <div className="wrapper">
                <div className="bg-primary d-flex message-founder__content text-center">
                  <h3 className="text-white">Message From Our Founder</h3>
                  <div className="message-founder__img">
                    <img src={`/assets/images/circle.jpg`} style={{ width: '100%' }} alt="" />
                  </div>
                  <h4 className="text-white">Hung Tran</h4>
                  <h4 className="text-white">Frontend Dev</h4>
                  <i className="text-white mt-2">{`“We look for people with passion and the capability to execute on that passion.”`}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageOurFounder;

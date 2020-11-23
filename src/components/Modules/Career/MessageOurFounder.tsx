import React from 'react'


function MessageOurFounder(props): JSX.Element {
  return (<>
    <div className="message-founder">
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <div className="bg-primary d-flex message-founder__content text-center">
              <h3 className="text-white">Message From Our Founder</h3>
              <div className="message-founder__img">
                <img src="https://career.thuocsi.vn/wp-content/uploads/2020/05/founder.png" style={{ width: "100%"}} alt=""/>
              </div>
              <h4 className="text-white">Peter Nguyen</h4>
              <h4 className="text-white">Chief Executive Officer</h4>
              <i className="text-white mt-2">{`“We look for people with passion and the capability to execute on that passion.”`}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default MessageOurFounder
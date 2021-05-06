import { Grid } from '@material-ui/core';
import { Trans, useTranslation } from 'i18n';
import React from 'react';

function Entry() {
  return (
    <div className="entry">
      <header className="entry-header">
        {/* entry-header */}
        <div className="entry-header-text">
          <h6>
            <a href="#">KHUYẾN MÃI</a>
            {`, `}
            <a href="#">KIẾN THỨC CHUYÊN MÔN</a>
          </h6>
          <h1>
            <a href="#">Bạn có biết chắc mình đã nắm rõ cách phân biệt bao cao su giả ?</a>
          </h1>
          <div className="entry-devider"></div>
          <div className="entry-meta">
            <span>
              POSTED ON
              <a href="#">{` APRIL 23, 2021 `}</a>
            </span>
            <span>
              BY
              <a>{` HAO NGUYEN`}</a>
            </span>
          </div>
        </div>

        {/*  */}
        <div className="entry-image">
          <a>
            <img
              alt=""
              style={{ width: '100%' }}
              src="https://i.pinimg.com/originals/b8/2f/28/b82f28a7e9c8fcb3868d3d94652c107c.gif"
            />
          </a>
          <div className="badge">
            <div className="badge-inner">
              <span className="post-date-day">23</span>
              <br />
              <span className="post-date-month">Apr</span>
            </div>
          </div>
        </div>
      </header>

      <div className="entry-content">
        <div className="entry-summary">
          <p>
            Lorem Ipsum has been the industr standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book
          </p>
          <div className="text-center">
            <a>
              COUNTINUE READING
              <span>{` ->`}</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="entry-meta">
        <span className="cat-links">
          Posted in {` `}
          <a>Khuyến mãi,</a>
          <a> Kiến thức chuyên môn</a>
        </span>

        <span>&nbsp;|&nbsp;</span>

        <span className="tags-links">
          Tagged {` `}
          <a href="#">baocaosugia</a>
        </span>

        <span className="comments-link pull-right">
          <a>Leave a comment</a>
        </span>
        <hr />
      </footer>
    </div>
  );
}

export default Entry;

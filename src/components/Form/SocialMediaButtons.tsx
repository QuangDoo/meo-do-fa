/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { FacebookShareButton } from 'react-share';
import styled from 'styled-components';

type SocialMediaProps = {
  url: string;
  text: string;
};

const WrapShareButtons = styled.div`
  & > .SocialMediaShareButton {
    display: inline-block;
    margin: 10px 0;
    margin-right: 10px;
  }

  & > .SocialMediaShareButton > .btn {
    width: 64px;
    height: 32px;
    padding: 0;
    border-radius: 0;
    border: 0;
  }

  & > .SocialMediaShareButton--facebook > .btn,
  & > .SocialMediaShareButton--facebook > .btn:hover,
  & > .SocialMediaShareButton--facebook > .btn:active,
  & > .SocialMediaShareButton--facebook > .btn:focus {
    background: #3b568d;
  }

  & > .SocialMediaShareButton > .btn > img {
    height: 32px;
  }
`;

const SocialMediaButtons = (props: SocialMediaProps) => (
  <WrapShareButtons>
    <FacebookShareButton url={props.url} quote={props.text}>
      <button>
        <img src="/images/facebook-icon.png" />
      </button>
    </FacebookShareButton>
  </WrapShareButtons>
);

export default SocialMediaButtons;

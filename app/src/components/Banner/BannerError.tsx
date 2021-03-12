// Core
import React from 'react';
import styled from 'styled-components';

const BannerErrorContainer = styled.div`
    background-color: #f17d7d;
    border: solid 1px #f17d7d;
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    color: #841717;
`
const BannerError = ({ error }) => {
  return error ? (<BannerErrorContainer>{error.toString()}</BannerErrorContainer>) : null
}

export default BannerError;

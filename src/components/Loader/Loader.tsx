import React from 'react';
import styled from 'styled-components';

const LoaderComponent = styled.div`
    width: 64px;
    height: 64px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    :after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid rgb(40, 3, 253);
    border-color: rgb(40, 3, 253) transparent rgb(40, 3, 253) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
    @keyframes {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`


export const Loader = () =>{
    return <>
      <LoaderComponent/>
    </>
}


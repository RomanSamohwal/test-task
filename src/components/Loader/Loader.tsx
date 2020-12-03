import React from 'react';
import {Spin} from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%; 
  min-height: 100vh; 
  display: flex; 
  align-items: center; 
  justify-content: center;
`
export const Loader = () => {
    return <>
        <Container>
            <Spin/>
        </Container>
    </>
}


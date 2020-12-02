import React from 'react';
import { Button } from 'antd';

export const ButtonComponent = (props:any) =>{
    return <>
        <Button type="primary" onClick={props.onClick}>{props.text}</Button>
    </>
}
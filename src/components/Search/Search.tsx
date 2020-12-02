import React from 'react';
import {Input} from 'antd';
import {AudioOutlined} from '@ant-design/icons';

const {Search} = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

export const SearchComponent = (props: any) => {

    return <>
        <Search placeholder='find job' allowClear
                onSearch={props.onSearch}
                style={{width: 200, margin: '0 10px'}}
                enterButton
        />
    </>
}

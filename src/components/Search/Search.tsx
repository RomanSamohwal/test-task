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

    const onSearch = (value: string) => {
            let findValue = value.trim().toLowerCase()
            props.onSearch(findValue)
    }

    return <>
        <Search placeholder='find job' allowClear
                onSearch={onSearch}
                style={{width: 200, margin: '0 10px'}}
                enterButton
        />
    </>
}

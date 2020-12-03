import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

export const SearchComponent = React.memo((props: any) => {

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
})

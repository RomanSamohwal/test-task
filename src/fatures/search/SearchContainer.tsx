import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {JobsArrayType} from '../../utils/types/types';
import {SearchComponent} from '../../components/Search/Search';

export const SearchContainer = (props: any) => {

    let findState = useSelector<AppRootStateType, JobsArrayType>(state => state.find)

    const onSearchJob = useCallback((value: string) => {
        const findJob = findState.filter(i => i.name.toLowerCase().includes(value.toLowerCase()))
        props.setRow(findJob)
        if (findJob.length) {
            props.setIsSelectedRow(true)
        }
    }, [findState])

    return <>
        <SearchComponent onSearch={onSearchJob}/>
    </>
}
import React, {useState} from 'react';
import {Loader} from '../components/Loader/Loader';
import {RenderContainer} from '../fatures/data-render/RenderContainer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {setAppStatus} from '../bll/app-reducer';

export const AppContainer = React.memo(() => {
    const dispatch = useAppDispatch()
    let status = useSelector<AppRootStateType>(state => state.app.status)
    let [firstRender, setFirstRender] = useState(true)
    if (firstRender) {
        dispatch(setAppStatus({status: 'loading'}))
        setTimeout(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        }, 1000)
        setFirstRender(false)
    }
    return <>
        {status === 'loading' ? <Loader/> : <RenderContainer/>}
    </>
})
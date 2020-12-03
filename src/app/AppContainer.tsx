import React, {useState} from 'react';
import {Loader} from '../components/Loader/Loader';
import {RenderContainer} from '../fatures/data-render/RenderContainer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {setAppStatus} from '../bll/app-reducer';
import {fetchJobs, fetchProcesses} from '../bll/thunks';

export const AppContainer = React.memo(() => {

    const dispatch = useAppDispatch()
    let [firstRender, setFirstRender] = useState(true)
    let status = useSelector<AppRootStateType>(state => state.app.status)

    if (firstRender) {
        dispatch(setAppStatus({status: 'loading'}))
        setTimeout(() => {
            dispatch(setAppStatus({status: 'succeeded'}))
        }, 1000)
        setFirstRender(false)
    }

    setTimeout(() => {
        dispatch(fetchProcesses())
        dispatch(fetchJobs())
    }, 100000)

    return <>
        {status === 'loading' ? <Loader/> : <RenderContainer/>}
    </>
})
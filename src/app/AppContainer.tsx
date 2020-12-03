import React from 'react';
import {RenderContainer} from '../fatures/data-render/RenderContainer';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import { Loader } from '../components/Loader/Loader';

export const AppContainer = React.memo(() => {
    let status = useSelector<AppRootStateType>(state => state.app.status)

   /* if (status === 'loading') {
        return <Loader/>
    }*/

    return <>
        <RenderContainer/>
    </>
})
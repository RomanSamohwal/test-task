import React, {useCallback, useEffect, useState} from 'react';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';
import {JobsType} from '../../utils/types/types';
import {generatorProcessStatus} from '../../utils/generatorObject';
import {setStatus} from '../../bll/process-reducer';
import {fetchJobs, fetchProcesses} from '../../bll/thunks';
import {DetailRowViewContainerComponent} from './DetailRowViewContainer';
import {TableContainer} from './TableContainer';

export const RenderContainer = React.memo(() => {
    const dispatch = useAppDispatch()

    let [firstRender, setFirstRender] = useState(true)
    let [row, setRow] = useState(null)
    let [isSelectedRow, setIsSelectedRow] = useState(false)
    let jobs = useSelector<AppRootStateType, JobsType>(state => state.jobs)

    let onGenerateJobs = useCallback((jobs: JobsType) => {
        for (const key in jobs) {
            let status = generatorProcessStatus(jobs[key])
            dispatch(setStatus({id: key, status: status}))
        }
    }, [jobs])

    useEffect(() => {
        if (firstRender) {
            dispatch(fetchProcesses())
            dispatch(fetchJobs())
            setFirstRender(false)
        }
        onGenerateJobs(jobs)
    }, [jobs])

    return <>
        {
            isSelectedRow
                ? <DetailRowViewContainerComponent
                    setIsSelectedRow={setIsSelectedRow}
                    data={row}
                    setRow={setRow}/>
                : <>
                    <TableContainer
                        setRow={setRow}
                        setIsSelectedRow={setIsSelectedRow}/>
                </>
        }
    </>
})
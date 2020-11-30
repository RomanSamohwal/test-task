import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Table} from './components/Table/Table';
import _ from 'lodash';
import {generatorJob, generatorProcessObject, generatorProcessStatus} from './components/utils/GeneraorProcessObject';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store/store';
import {
    addProcess,
    deleteProcess,
    fetchProcesses,
    orderProcess,
    saveProcess,
    setStatus,
} from './process-reducer';
import {addJobs, deleteJobs, saveJob} from './jobs-reducer';
import {DetailRowView} from './components/DatailRowView/DetailRowView';
import { ProcessesType } from './ProcessType';
import {JobsArrayType, JobsType} from './JobsType';
import {fetchJobs} from './Thunks';

export const AppWithReducer =  React.memo((props: any) => {
    console.log('app render')
    const dispatch = useAppDispatch()

    let [firstRender,setFirstRender] = useState(true)
    let [sort, setSort] = useState('asc')
    let [row, setRow] = useState<any>(null)
    let [sortField, setSortField] = useState('id')
    let [isSelectedRow, setIsSelectedRow ] = useState(false)
    let [inputValue, setInputValue] = useState('')

    let processes = useSelector<AppRootStateType, ProcessesType>(state => state.processes)
    let jobs = useSelector<AppRootStateType,JobsType>(state => state.jobs)
    let findState = useSelector<AppRootStateType,JobsArrayType>(state => state.find)

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

    const onSort = (sortField: any) => {
        const cloneData = processes.concat();
        const sortType = sort === 'asc' ? 'desc' : 'asc';
        const order = _.orderBy(cloneData, sortField, sortType);
        dispatch(orderProcess({process: order}))
        setSort(sortType)
        setSortField(sortField)
    }

    const isSelectedHandler = useCallback(() => {
        setIsSelectedRow(false)
    }, [isSelectedRow])

    const onRowSelect = (id: any) => {
        let selectedRow = jobs[id]
        setRow(selectedRow)
        setIsSelectedRow(true)
    }

    const onDeleteProcess = (id: string) => {
        dispatch(deleteProcess({id}))
        dispatch(deleteJobs({id}))
        dispatch(saveProcess())
        dispatch(saveJob())
    }

    const onAddProcess = () => {
        const process = generatorProcessObject()
        const processId = process.id
        const newJobs = []
        for (let i = 0; i < process.jobsCount; i++) {
            let newJob = generatorJob(processId)
            newJobs.push(newJob)
        }
        let status = generatorProcessStatus(newJobs)
        dispatch(addProcess({process, status}))
        dispatch(addJobs({id: processId, jobs: newJobs}))
        dispatch(saveProcess())
        dispatch(saveJob())
    }

    const onFindJob = () => {

    const findJob = findState.filter(i=>i.name.includes(inputValue))
    setRow(findJob)
    setIsSelectedRow(true)
  }

    return <div>
        <div>
            <input type="text" onChange={(e) => {
                setInputValue(e.currentTarget.value)
            }} value={inputValue}/>
            <button onClick={onFindJob}>find job</button>
        </div>
        <div>
            <button onClick={onAddProcess}>add process</button>
        </div>
        {isSelectedRow
            ? <DetailRowView closeTable={isSelectedHandler} data={row}/>
            : <Table data={processes} onSort={onSort} onRowSelect={onRowSelect}
                     addProcess={onAddProcess} delete={onDeleteProcess}/>}

    </div>
})
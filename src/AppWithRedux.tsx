import React, {useEffect, useState} from 'react';
import {Table} from './components/Table/Table';
import _ from 'lodash';
import {generatorJob, generatorProcessObject} from './components/utils/GeneraorProcessObject';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store/store';
import {addProcess, deleteProcess, fetchProcesses, orderProcess, ProcessesType} from './process-reducer';
import {addJobs, deleteJobs, fetchJobs, JobsType, JobType} from './jobs-reducer';
import {DetailRowView} from './components/DatailRowView/DetailRowView';

export const AppWithReducer =  React.memo((props: any) => {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchProcesses())
        dispatch(fetchJobs())
    },[dispatch])


    let [sort, setSort] = useState('asc')
    let [row, setRow] = useState<any>(null)
    let [sortField, setSortField] = useState('id')
    let [isSelectedRow, setIsSelectedRow ] = useState(false)
    let [inputValue, setInputValue] = useState('')

    let processes = useSelector<AppRootStateType, ProcessesType>(state => state.processes)
    let jobs = useSelector<AppRootStateType,JobsType>(state => state.jobs)

    const onSort = (sortField: any) => {
        const cloneData = processes.concat();
        const sortType = sort === 'asc' ? 'desc' : 'asc';
        const order = _.orderBy(cloneData, sortField, sortType);
        dispatch(orderProcess({process: order}))
        setSort(sortType)
        setSortField(sortField)
    }

    const isSelectedHandler = () =>{
        setIsSelectedRow(false)
    }

    const onRowSelect = (id: any) => {
        let selectedRow = jobs[id]
        setRow(selectedRow)
        setIsSelectedRow(true)
    }

    const onDeleteProcess = (id: string) => {
        dispatch(deleteProcess({id}))
        dispatch(deleteJobs({id}))
    }

    const onAddProcess = () => {
        const process = generatorProcessObject()
        const processId = process.id
        const newJobs = []
        for (let i = 0; i < process.jobsCount; i++) {
            let newJob = generatorJob(processId)
            newJobs.push(newJob)
        }
        dispatch(addProcess({process}))
        dispatch(addJobs({id: processId, jobs: newJobs}))
    }

    const onFindJob = () => {
        /*   let findJob: any
           for (let jobIdKey in jobs) {
               findJob = jobs[jobIdKey].filter(j => j.name === inputValue)
               if(findJob[0].name === inputValue){
                   break
               }
           }
           debugger
           setRow(findJob)
           setIsSelectedRow(true)*/
    }

    return <div>
        <div>
            <input type="text"  onChange={(e)=>{
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
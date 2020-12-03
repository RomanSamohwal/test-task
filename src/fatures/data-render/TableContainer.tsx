import React, {useState} from 'react';
import {Table} from '../../components/Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {JobsType, ProcessesType} from '../../utils/types/types';
import _ from 'lodash';
import {addProcess, deleteProcess, orderProcess} from '../../bll/process-reducer';
import {addJobs, deleteJobs} from '../../bll/jobs-reducer';
import {saveJob, saveProcess} from '../../bll/thunks';
import {generatorJob, generatorProcessObject, generatorProcessStatus} from '../../utils/generatorObject';
import {ButtonComponent} from '../../components/Button/Button';

export const TableContainer = React.memo((props: any) => {
    const dispatch = useAppDispatch()
    let processes = useSelector<AppRootStateType, ProcessesType>(state => state.processes)

    let [sort, setSort] = useState('asc')
    let [sortField, setSortField] = useState('id')
    let jobs = useSelector<AppRootStateType, JobsType>(state => state.jobs)

    const onSort = (sortField: string) => {
        const cloneData = processes.concat();
        const sortType = sort === 'asc' ? 'desc' : 'asc';
        const order = _.orderBy(cloneData, sortField, sortType);
        dispatch(orderProcess({process: order}))
        setSort(sortType)
        setSortField(sortField)
    }

    const onRowSelect = (id: string) => {
        let selectedRow = jobs[id]
        props.setRow(selectedRow)
        props.setIsSelectedRow(true)
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

    return <>
        <ButtonComponent onClick={onAddProcess} text={'add process'}/>
        <Table data={processes}
               onSort={onSort}
               onRowSelect={onRowSelect}
               addProcess={onAddProcess}
               delete={onDeleteProcess}
               sort={sort}
               sortField={sortField}
        />
    </>
})
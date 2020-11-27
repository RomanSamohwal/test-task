import React, {useState} from 'react';
import {Table} from './components/Table/Table';
import _ from 'lodash';
import {generatorJob, generatorProcessObject} from './components/utils/GeneraorProcessObject';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store/store';
import {addProcess, deleteProcess, ProcessesType,orderProcess} from './process-reducer';


export const AppWithReducer = (props: any) => {


    let [sort, setSort] = useState('asc')
    const dispatch = useAppDispatch()
    let [sortField, setSortField] = useState('id')

    let processes = useSelector<AppRootStateType, ProcessesType>(state => state.processes)

    /*const onSort = (sortField: any) => {
        /!*const cloneData = processes.concat();*!/
        const sortType = sort === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(processes, sortField, sortType);
        // @ts-ignore
        dispatch(addProcess({process : orderedData}))
        setSort(sortType)
        setSortField(sortField)
    }*/
    const onSort = (sortField: any) => {
        const cloneData = processes.concat();
        const sortType = sort === 'asc' ? 'desc' : 'asc';
        const order = _.orderBy(cloneData, sortField, sortType);
        // @ts-ignore
        dispatch(orderProcess({process : order}))
        setSort(sortType)
        setSortField(sortField)
    }

    const onRowSelect = (id: any) => {

    }

    const onDeleteProcess = (id: string) => {
      dispatch(deleteProcess({id}))
    }

    const onAddProcess = () => {
        const process = generatorProcessObject()
        dispatch(addProcess({process}))
    }

    return <div>
        <div>
            <button onClick={onAddProcess}>add process</button>
        </div>
        <Table data={processes} onSort={onSort} onRowSelect={onRowSelect}
               addProcess={onAddProcess} delete={onDeleteProcess}/>
    </div>
}
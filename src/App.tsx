import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import _ from 'lodash';
import {DetailRowView} from './components/DatailRowView/DetailRowView';
import {Table} from './components/Table/Table';
import {generatorJob, generatorProcessObject} from './components/utils/GeneraorProcessObject';


function App() {
  const processId1 = v1()
  const processId2 = v1()

  const jobId1 = v1()
  const jobId2 = v1()
  const jobId3 = v1()
  const jobId4 = v1()
  const jobId5 = v1()

  let [processes, setProcess] = useState<ProcessesType>([
    {id: processId1, name: 'Process1' ,jobsCount: 2 , startTime : 12},
    {id: processId2, name: 'Process2' ,jobsCount: 3 , startTime : 13}
    ])

  let [jobs, setJobs] = useState<JobsType>({
    [processId1] : [{id: jobId1, name: 'JobProc1', processId: processId1, status: JobStatuses.running}, {id: jobId2, name: 'JobProc1', processId: processId1, status: JobStatuses.running}],
    [processId2] : [{id: jobId3, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId4, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId5, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}]
  })

  let [sort, setSort] = useState('asc')
  let [sortField, setSortField] = useState('id')
  let [row, setRow] = useState<any>(null)
  let [isSelectedRow, setIsSelectedRow ] = useState(false)
  let [allJobs, setAllJobs] = useState<JobsArrayType>([])
  let [inputValue, setInputValue] = useState('')

  const onSort = (sortField: any) => {
    const cloneData = processes.concat();
    const sortType = sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    setProcess(orderedData)
    setSort(sortType)
    setSortField(sortField)
  }

  const onRowSelect = (id: any) => {
    let selectedRow = jobs[id]
    setRow(selectedRow)
    setIsSelectedRow(true)
  }

  const isSelectedHandler = () => {
    setIsSelectedRow(false)
  }

  const addNewProcess = () => {
    const process = generatorProcessObject()
    const processId = process.id
    const newJobsArray = []
    for (let i = 0; i < process.jobsCount; i++) {
      let newJob = generatorJob(processId)
      newJobsArray.push(newJob)
    }

    const copyJobs = {...jobs}
    copyJobs[processId] = newJobsArray
    setJobs(copyJobs)
    setProcess([process, ...processes])
    //all jobs
    const copyAllJobsArray = [...newJobsArray, ...allJobs]
    setAllJobs(copyAllJobsArray)
  }

  const deleteProcess = (id: string) => {
    setProcess(processes.filter(i => i.id !== id))
    delete jobs[id]
  }

  const onFindJob = () => {
    const findJob = allJobs.filter(i=>i.name.includes(inputValue))
    setRow(findJob)
    setIsSelectedRow(true)
  }

  return (
      <div className="App">
        <div>
          <input type="text"  onChange={(e)=>{
            setInputValue(e.currentTarget.value)
          }} value={inputValue}/>
          <button onClick={onFindJob}>find job</button>
        </div>
        <div>
           <button onClick={addNewProcess}>add process</button>
         </div>

        {isSelectedRow
            ? <DetailRowView closeTable={isSelectedHandler} data={row}/>
            : <Table data={processes} onSort={onSort} onRowSelect={onRowSelect}
                          addProcess={addNewProcess} delete={deleteProcess}/>}
      </div>
  );
}

export default App;

export type JobType = {
  id: string
  processId: string
  name: string
  status: JobStatuses
}
export type ProcessType = {
  id: string
  name: string
  startTime: number
  jobsCount: number
}

export type ProcessesType = Array<ProcessType>
export type JobsType = {
  [key: string]: JobsArrayType
}
export type JobsArrayType = Array<JobType>

export enum JobStatuses {
  running = 0,
  successed = 1,
  failed = 2,
}

export type RequestStatusType = 'running' | 'successed' | 'failed'


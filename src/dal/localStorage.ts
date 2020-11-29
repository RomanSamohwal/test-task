import {processId1, processId2} from '../ProcessesId';
import {JobStatuses} from '../jobs-reducer';
import {v1} from 'uuid';
const jobId1 = v1()
const jobId2 = v1()
const jobId3 = v1()
const jobId4 = v1()
const jobId5 = v1()

let initProcess = [
    {id: processId1, name: 'Process1', jobsCount: 2, startTime: 12},
    {id: processId2, name: 'Process2', jobsCount: 3, startTime: 13}
]

let initJobs = [{id: jobId1, name: 'JobProc1', processId: processId1, status: JobStatuses.running},
    {id: jobId3, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {
        id: jobId4,
        name: 'JobProc2',
        processId: processId2,
        status: JobStatuses.failed
    }]


export const saveProcesses = ( state: any) => {
    localStorage.setItem('processes', JSON.stringify(state));
};

export const saveJobs = (state: any) => {
    localStorage.setItem('jobs', JSON.stringify(state));
};

export const restoreProcesses = () => {
    if (localStorage.getItem('processes') === null) {
        debugger
        return initProcess
    } else {
        return JSON.parse(<string>localStorage.getItem('processes'))
    }
};

export const restoreJobs = () => {
    if (localStorage.getItem('jobs') === null) {
        return initJobs
    } else {
        return JSON.parse(<string>localStorage.getItem('jobs'))
    }
};

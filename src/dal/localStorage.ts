import {jobId1} from '../utils/JobsId';
import {processId1, processId2} from '../utils/ProcessesId';

let initProcess = [
    {id: processId1, name: 'Process1', jobsCount: 2, startTime: 12},
    {id: processId2, name: 'Process2', jobsCount: 3, startTime: 13}
]

let initJobs = [{id: jobId1, name: 'JobProc1', processId: processId1, status: 'running'},
    {id: jobId1, name: 'JobProc2', processId: processId2, status: 'failed'},
    {id: jobId1, name: 'JobProc3', processId: processId2, status: 'failed'}]


export const saveProcesses = (state: any) => {
    localStorage.setItem('processes', JSON.stringify(state));
};

export const saveJobs = (state: any) => {
    localStorage.setItem('jobs', JSON.stringify(state));
};

export const restoreProcesses = async () => {
    if (localStorage.getItem('processes') === null) {
            return initProcess
    } else {
        return JSON.parse(<string>localStorage.getItem('processes'))
    }
};

export const restoreJobs =  () => {
    if (localStorage.getItem('jobs') === null) {
            return initJobs
    } else {
        return JSON.parse(<string>localStorage.getItem('jobs'))
    }
};

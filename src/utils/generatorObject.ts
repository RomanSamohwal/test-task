import {v1} from 'uuid';
import {JobsArrayType, JobStatuses, JobType, ProcessType} from './types/types';


export const generatorProcessObject = (): ProcessType => {
    const id = v1()
    const name = randomNameGenerator()
    const jobsCount = Math.floor(Math.random() * 10) + 1;
    const startTime = new Date().getTime()
    return {id, name, jobsCount, startTime}
}

export const randomNameGenerator = () => {
    const num = 8;
    let res = '';
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    }
    return res;
}

export const generatorJob = (processId: string): JobType => {
    const id = v1()
    const name = randomNameGenerator()
    const number = Math.floor(Math.random() * 3);
    let status: JobStatuses
    switch (number) {
        case 1: {
            status = JobStatuses.successed
            break
        }
        case 2: {
            status = JobStatuses.failed;
            break
        }
        default : {
            status = JobStatuses.running
        }
    }
    let convertStatus = converterStatus(status)

    return {id, name, processId, status: convertStatus}
}

export const generatorProcessStatus = (jobs: JobsArrayType) => {
    let status: string = 'undefined status'
    let running = jobs.some(j => j.status === 'running')
    let successed = jobs.every(j => j.status === 'successed')
    let failed = jobs.every(j => j.status === 'failed')
    if (running) {
        status = 'in progress'
    }
    if (successed) {
        status = 'successed'
    }
    if (failed) {
        status = 'failed'
    }
    return status
}

export const converterStatus = (status: number) => {
    let convertStatus: string
    switch (status) {
        case 1: {
            convertStatus = 'successed'
            break
        }
        case 2: {
            convertStatus = 'failed'
            break
        }
        default: {
            convertStatus = 'running'
        }
    }
    return convertStatus
}
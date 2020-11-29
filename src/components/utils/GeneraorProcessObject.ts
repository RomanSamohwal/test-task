import {v1} from 'uuid';
import {JobStatuses, JobType, ProcessType} from '../../App';

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
    for(let i = 0; i < num; i++){
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
    };
    return res;
}

export const generatorJob = (processId: string): JobType => {
    const id = v1()
    const name = randomNameGenerator()
    const number = Math.floor(Math.random() * 3);
    let status: JobStatuses
    switch (number) {
        case 0: {
            status = JobStatuses.failed;
            break
        }
        case 1: {
            status = JobStatuses.successed
            break
        }
        default : {
            status = JobStatuses.running
        }
    }
    return {id, name, processId, status}
}

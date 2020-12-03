export type ProcessesType = Array<ProcessType>;
export type ProcessType = {
    id: string
    name: string
    startTime: number
    jobsCount: number
    status?: string
}

export type JobsType = {
    [key: string]: JobsArrayType
}
export type JobsArrayType = Array<JobType>
export type JobType = {
    id: string
    processId: string
    name: string
    status: string
}

export enum JobStatuses {
    running = 0,
    successed = 1,
    failed = 2,
}


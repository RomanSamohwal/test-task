export type ProcessesType = Array<ProcessType>;
export type ProcessType = {
    id: string
    name: string
    startTime: number
    jobsCount: number
    status?: string
}

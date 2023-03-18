export type goalTypes = "backlog" | "started" | "paused" | "completed" | "archived"

export interface GoalTaskModel {
    id?: number,
    title: string,
    complete: boolean
}

export interface GoalModel {
    id?: number,
    title: string,
    description: string,
    duration: string,
    tasks?: Array<GoalTaskModel>,
    comment?: string,
    pausedCount: number,
    goalStatus: goalTypes
}
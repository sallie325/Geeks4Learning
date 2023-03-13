export type goalTypes = "backlog" | "started" | "paused" | "completed" | "archived"

export interface GoalModel {
    title: string,
    description: string,
    duration: string
}
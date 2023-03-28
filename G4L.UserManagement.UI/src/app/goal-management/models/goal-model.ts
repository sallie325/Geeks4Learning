export type goalStatus =
  | 'backlog'
  | 'started'
  | 'paused'
  | 'completed'
  | 'archived';

export type viewType = "create" | "view";

export interface GoalTaskModel {
  id?: number;
  title: string;
  complete: boolean;
  goalId?: number;
}

export interface GoalCommentModel {
  id?: number;
  comment: string;
  commentType: "backlog" | "archived";
  goalId?: number;
}

export interface GoalModel {
  id?: number;
  title: string;
  description: string;
  duration: string;
  tasks?: Array<GoalTaskModel>;
  comment?: Array<GoalCommentModel>;
  pausedCount: number;
  archiveCount: number;
  goalStatus: goalStatus;
  attendanceId?: string;
  timeRemaining: string;
  userId: string;
}

export type goalStatus =
  | 'backlog'
  | 'started'
  | 'paused'
  | 'completed'
  | 'archived';

export interface GoalTaskModel {
  id?: number;
  title: string;
  complete: boolean;
}

export interface GoalCommentModel {
  id?: number;
  comment: string;
  commentType: "backlog" | "archived";
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
  attendanceId: string;
  userId: string;
  timeRemaining: string;
}

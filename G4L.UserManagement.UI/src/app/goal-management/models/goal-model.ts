export type goalStatus =
  | 'backlog'
  | 'started'
  | 'paused'
  | 'completed'
  | 'archived';

export interface goalTypes {
  backlog: Array<GoalModel>;
  started: Array<GoalModel>;
  paused: Array<GoalModel>;
  completed: Array<GoalModel>;
  archived: Array<GoalModel>;
}

export type viewType = 'create' | 'view';

export type goalButtonAction =
  | 'start'
  | 'resume'
  | 'complete'
  | 'restore'
  | 'archive'
  | 'pause';

export type activeGoalPopupWindowState = 'open' | 'close';

export interface GoalTaskModel {
  id?: number;
  title: string;
  complete: boolean;
  goalId?: number;
}

export interface GoalCommentModel {
  id?: number;
  comment: string;
  commentType: 'paused' | 'archived';
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
  timeRemaining: string;
  userId: string;
}

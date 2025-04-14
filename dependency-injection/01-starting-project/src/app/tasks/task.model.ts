import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
export interface TaskStatusOption {
  value: 'open' | 'in-progress' | 'done',
  displayValue: 'Open' | 'In-Progress' | 'Completed',
  status: TaskStatus
}

export const TaskStatusOptions: TaskStatusOption[] = [{
  value: 'open',
  displayValue: 'Open',
  status: 'OPEN'
}, {
  value: 'in-progress',
  displayValue: 'In-Progress',
  status: 'IN_PROGRESS'
}, {
  value: 'done',
  displayValue: 'Completed',
  status: 'DONE'
}]

export const TASK_STATUS_OPTION_TOKEN = new InjectionToken<TaskStatusOption[]>('task-status-options');
export const tokenOptionProvider:Provider = { provide: TASK_STATUS_OPTION_TOKEN, useValue: TaskStatusOptions }
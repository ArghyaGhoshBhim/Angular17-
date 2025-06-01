import { Route } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';

export const routes: Route[] = [
  {
    path: '',
    component: NoTaskComponent,
  },
  {
    path: 'tasks',
    component: TaskComponent,
  },
];

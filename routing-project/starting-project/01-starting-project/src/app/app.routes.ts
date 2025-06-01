import { Route } from '@angular/router';
import { TaskComponent } from './tasks/task/task.component';

export const routes: Route[] = [
  {
    path: 'tasks',
    component: TaskComponent,
  },
];

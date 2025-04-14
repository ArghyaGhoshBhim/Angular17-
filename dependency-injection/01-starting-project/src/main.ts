import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/task.service';
import { InjectionToken } from '@angular/core';

export const TaskServiceToken = new InjectionToken<TaskService>(
  'task-service-token'
);
//platform injector this service will be definetly part of initial bundle
bootstrapApplication(AppComponent, {
  providers: [{ provide: TaskServiceToken, useClass: TaskService }],
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) =>
//   console.error(err)
// );

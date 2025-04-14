import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/task.service';

//platform injector this service will be definetly part of initial bundle
// bootstrapApplication(AppComponent, { providers: [TaskService] }).catch((err) =>
//   console.error(err)
// );

bootstrapApplication(AppComponent).catch((err) =>
  console.error(err)
);

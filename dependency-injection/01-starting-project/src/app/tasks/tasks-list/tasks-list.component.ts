import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TaskServiceToken } from '../../../main';
import { TASK_STATUS_OPTION_TOKEN, tokenOptionProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[tokenOptionProvider]
})
export class TasksListComponent {
  private taskService = inject(TaskServiceToken);
  taskOptions=inject(TASK_STATUS_OPTION_TOKEN)
  selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService
          .getTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .getTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .getTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.taskService.getTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

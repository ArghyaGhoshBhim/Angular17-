import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TASK_STATUS_OPTION_TOKEN, Task, TaskStatus, TaskStatusOptions, tokenOptionProvider } from '../../task.model';
import { TaskServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [tokenOptionProvider]
})
export class TaskItemComponent {
  task = input.required<Task>();
  private taskService = inject(TaskServiceToken);
  taskOptionProviders=inject(TASK_STATUS_OPTION_TOKEN);

  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskService.updateTask(taskId, newStatus);
  }
}

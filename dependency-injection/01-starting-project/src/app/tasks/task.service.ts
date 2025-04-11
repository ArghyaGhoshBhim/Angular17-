import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>([]);
  getTasks = this.tasks.asReadonly();
  addTask(taskData: { title: string; description: string }): void {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldValue) => [...oldValue, newTask]);
  }

  updateTask(taskId: string, status: TaskStatus): void {
    this.tasks.update((oldValue) =>
      oldValue.map((task) =>
        task.id === taskId ? { ...task, status: status } : task
      )
    );
  }
}

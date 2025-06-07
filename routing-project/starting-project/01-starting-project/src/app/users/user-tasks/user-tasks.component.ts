import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroy = inject(DestroyRef);
  userName = '';

  // userName = computed(
  //   () => this.userService.users.find((user) => user.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe((param) => {
      this.userName =
        this.userService.users.find((user) => user.id === param.get('userId'))
          ?.name || '';
    });

    this.destroy.onDestroy(() => subscription.unsubscribe());
  }
}

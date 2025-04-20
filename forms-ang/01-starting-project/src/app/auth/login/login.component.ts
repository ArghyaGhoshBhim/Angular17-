import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const saveForms = window.localStorage.getItem('save-login-forms');
      if (saveForms) {
        const formValue = JSON.parse(saveForms);
        const saveEmail = formValue?.email;
        setTimeout(() => {
          this.form()?.controls['email'].setValue(saveEmail);
        }, 1);
      }
      const subscription = this.form()
        ?.valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'save-login-forms',
              JSON.stringify({ email: value?.email })
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }
  onSubmit(formData: NgForm) {
    console.log(formData.value);
    if (formData.form.invalid) {
      return;
    }

    console.log(formData.form.value.email, formData.form.value.password);
    formData.form.reset();
  }
}

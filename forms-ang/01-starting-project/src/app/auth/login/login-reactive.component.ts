import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  templateUrl: './login-reactive.component.html',
  styleUrl: './login.component.css',
})
export class LoginReactiveComponent {
    form=new FormGroup({
        email: new FormControl(''),
        password:new FormControl('')
    })
}
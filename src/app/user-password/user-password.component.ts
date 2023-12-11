import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent {

  constructor() {}
  
  ngOnInit(): void {
  }

  formPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get form(): any {
    return this.formPassword.controls;
  }


  onSubmit(): void{  
  }
}

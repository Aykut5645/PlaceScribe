import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    passwordInputType = 'password';

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
    }

    changePasswordInputType(type: string): void {
        this.passwordInputType = type;
    }

    submitHandler(): void {
        console.log('Login => ', this.loginForm.value);
    }

    private createForm(): void {
        this.loginForm = this.fb.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.loginForm.value.email,
                password: this.loginForm.value.password,
            }),
        };
        fetch('http://localhost:5000/api/users/login', requestOptions)
            .then((response) => response)
            .then((data) => console.log(data)).catch(err => console.log(err));
    }

    get emailIsValid() {
        return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
    }

    get passwordIsValid() {
        return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
    }

    private createForm(): void {
        this.loginForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
        });
    }
}

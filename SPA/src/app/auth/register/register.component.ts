import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    passwordInputType = 'password';

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
    }

    changePasswordInputType(type: string): void {
        this.passwordInputType = type;
    }

    get nameIsValid(): boolean {
        return Boolean(this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched);
    }

    get emailIsValid(): boolean {
        return Boolean(this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched);
    }

    get passwordIsValid(): boolean {
        return Boolean(this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched);
    }

    get isMatch(): boolean {
        return Boolean(
            this.registerForm.get('password')?.valid &&
                this.registerForm.get('confirmPassword')?.valid &&
                this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value,
        );
    }

    submitHandler(): void {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.registerForm.value.name,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password,
            }),
        };
        fetch('http://localhost:5000/api/users/signup', requestOptions)
            .then((response) => response)
            .then((data) => console.log(data)).catch(err => console.log(err));
        // console.log(
        //     'Register => ',
        //     this.registerForm.value.name,
        //     this.registerForm.value.email,
        //     this.registerForm.value.password,
        //     this.registerForm.value.confirmPassword,
        // );
    }

    private createForm(): void {
        this.registerForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [null, [Validators.required]],
        });
    }
}

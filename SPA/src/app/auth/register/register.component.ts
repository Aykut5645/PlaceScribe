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
            this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value
        );
    }

    submitHandler(): void {
        console.log('Register => ', this.registerForm.value);
    }

    private createForm(): void {
        this.registerForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [null, [Validators.required]],
        });
    }
}

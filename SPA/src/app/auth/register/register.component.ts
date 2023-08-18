import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthApiActions } from '../+state/actions';
import { mimeType } from '../../mime-type.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    passwordInputType = 'password';
    imagePreview: string = '';

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    changePasswordInputType(type: string): void {
        this.passwordInputType = type;
    }

    imagePickerHandler(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];

            this.registerForm.patchValue({ image: file });
            this.registerForm.get('image')?.updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
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
        this.store.dispatch(AuthApiActions.register(this.registerForm.value));
    }

    private createForm(): void {
        this.registerForm = this.fb.group({
            image: [null, { validators: [Validators.required], asyncValidators: [mimeType] }],
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [null, [Validators.required]],
        });
    }
}

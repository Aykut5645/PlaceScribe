import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';
import { mimeType } from '../../../shared/validators/mime-type.validator';
import { Observable } from 'rxjs';
import { CurrentUserSelectors } from '../../+state/selectors';

@Component({
    selector: 'app-handle-place',
    templateUrl: './handle-place.component.html',
    styleUrls: ['./handle-place.component.scss'],
})
export class HandlePlaceComponent implements OnInit {
    placeForm!: FormGroup;
    @Input() isEditMode: boolean = false;
    imagePreview: string = '';
    currentUserId: string;

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.store.select(CurrentUserSelectors.getCurrentUserId).subscribe((userId) => {
            this.currentUserId = userId;
        });
    }

    imagePickerHandler(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];

            this.placeForm.patchValue({ image: file });
            this.placeForm.get('image')?.updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    get titleIsValid() {
        return this.placeForm.get('title')?.invalid && this.placeForm.get('title')?.touched;
    }

    get descriptionIsValid() {
        return this.placeForm.get('description')?.invalid && this.placeForm.get('description')?.touched;
    }

    get addressIsValid() {
        return this.placeForm.get('address')?.invalid && this.placeForm.get('address')?.touched;
    }

    submitHandler(): void {
        this.store.dispatch(
            PlaceApiActions.createPlace({
                createdPlace: {
                    ...this.placeForm.value,
                    creator: this.currentUserId,
                },
            }),
        );
    }

    createForm(): void {
        this.placeForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required, Validators.minLength(6)]],
            address: [null, [Validators.required]],
            image: [null, { validators: [Validators.required], asyncValidators: [mimeType] }],
        });
    }
}
